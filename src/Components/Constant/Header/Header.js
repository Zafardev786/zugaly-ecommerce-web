import React from 'react';
import { FaPlus } from 'react-icons/fa';

const Header = ({ iconsImgs, navigation }) => {
  return (
    <>
      <div className="fixed bottom-0 left-50 m-2 z-[999]">
        <div>
          {iconsImgs && (
            <button className="grid-c-title-icon" onClick={navigation}>
              <FaPlus style={{ fontSize: '20px' }} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
