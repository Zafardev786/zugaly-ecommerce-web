import React from 'react';

const FileUpload = ({ Press, title }) => {
    return (
        <button type="submit" className="submit-btn"  onClick={Press}>{title}</button>
    );
};

export default FileUpload;
