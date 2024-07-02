import React from 'react';

interface MenuNavProps {
  handleClickPrev: () => void;
  handleClickNext: () => void;
  mode: string;
}

const MenuNav: React.FC<MenuNavProps> = ({ handleClickPrev, handleClickNext, mode }: MenuNavProps) => {
  return (
    <div className="grid grid-cols-2 mt-4 text-white">
      <div className="text-left">
        <button
          data-testid={`menu-nav-prev-${mode}`}
          onClick={handleClickPrev}
          className="text-4xl hover:scale-125 transition-scale duration-300"
        >
          &#9664;
        </button>
      </div>
      <div className="text-right">
        <button
          data-testid={`menu-nav-next-${mode}`}
          onClick={handleClickNext}
          className="text-4xl hover:scale-125 transition-scale duration-300"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default MenuNav;
