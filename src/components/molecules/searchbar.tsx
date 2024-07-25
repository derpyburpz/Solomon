import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import grey from '@mui/material/colors/grey';

import { supabase } from './../../supabaseClient';
import { searchInterface } from './../../types/modelTypes';
import { ColorModeContext } from './../../contexts/colormodecontext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const SearchBar: React.FC = () => {
  const { mode } = useContext(ColorModeContext);

  const [isTyping, setTyping] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<searchInterface[]>([]); // Expect Model array, inittialy empty array
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchModels = async () => {
      if (search.length === 0) {
        setResults([]);
        return;
      }

    const { data: realGrades, error: RGError } = await supabase
      .from('Real_Grades')
      .select('ID, Model')
      // .or(`Model.ilike.%${search}%, Release_Date.ilike.%${search}%`)
      .ilike('Model', `%${search}%`)

    const { data: masterGrades, error: MGError } = await supabase
      .from('Master_Grades')
      .select('ID, Model')
      // .or(`Model.ilike.%${search}%, Release_Date.ilike.%${search}%`)
      .ilike('Model', `%${search}%`)

    if (RGError) console.error('Error fetching from Real_Grades:', RGError);
    if (MGError) console.error('Error fetching from Master_Grades:', MGError);

    const insertRGSource = (realGrades ?? []).map(element => ({ ...element, source: 'Real_Grades' as const })); // source property cannot be string
    const insertMGSource = (masterGrades ?? []).map(element => ({ ...element, source: 'Master_Grades' as const }));

    if (isMounted) {
      const mergedResults: searchInterface[] = [
        ...insertRGSource,
        ...insertMGSource
      ];
      setResults(mergedResults);
    }
  };

    fetchModels();

    return () => {  // Cleanup
      isMounted = false;
    };
  }, [search]); // dependency array [search] retriggers useEffect to rerun when search query changes
  
  const handleResultClick = (ID: number, source: 'Real_Grades' | 'Master_Grades') => {
    const path = `/models/${source.toLowerCase()}/${ID}`;
    navigate(path, { state: { source } });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (resultsRef.current && resultsRef.current.contains(document.activeElement)) {
        return;
      }
      setTyping(false);
    }, 200);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Search>
      <SearchIconWrapper>
          <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
          placeholder="Search by kit name here"
          inputProps={{ 'aria-label': 'search' }}
          value = {search}
          onChange = {(e) => setSearch(e.target.value)}
          onFocus = {() => setTyping(true)}
          onBlur={handleBlur}
      />
      </Search>

    {isTyping && results.length > 0 && (
      <Box ref={resultsRef} sx={{ position: 'absolute', top: '100%', left: 0, width: '98%', transform: 'translateX(2%)', backgroundColor: mode === 'dark' ? grey[900] :'white', 
      borderRadius: 1, boxShadow: 3, zIndex: 5 }}>
        {results.map((element) => (
          <Box key={element.ID} sx={{ padding: 1, cursor: 'pointer' }} onClick={() => handleResultClick(element.ID, element.source)}>
            <Typography>{element.Model}</Typography>
          </Box>
        ))}
      </Box>
      )}
    </Box>
  );
};

export default SearchBar;