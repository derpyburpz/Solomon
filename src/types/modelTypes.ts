export interface searchInterface {
  ID: number;
  Model: string;
  source: 'Real_Grades' | 'Master_Grades';
}

export interface ModelCardProps {
  id: string;
  source: 'Real_Grades' | 'Master_Grades';
}

export interface RG_Model {
    ID: number;
    RG_Num: string;
    Model: string;
    Series: string;
    Price: string;
    Release_Date: string;
    Notes: string;
}

export interface MG_Model {
  ID: number;
  MG_Num: string;
  Model: string;
  Series: string;
  Price: string;
  Release_Date: string;
  Notes: string;
}