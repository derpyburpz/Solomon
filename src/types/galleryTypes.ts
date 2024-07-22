export interface SliderSettings {
    arrows?: boolean;
    slidesToShow: number;
    slidesToScroll?: number;
    dots?: boolean;
    centerMode?: boolean;
    focusOnSelect?: boolean;
    swipeToSlide?: boolean;
    infinite?: boolean;
    beforeChange?: (oldIndex: number, newIndex: number) => void;
  }