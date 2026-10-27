import React from 'react';

const getCategoryColor = (category) => {
  switch (category?.toLowerCase()) {
    case 'work': return 'var(--primary)';
    case 'personal': return '#006a60';
    case 'health': return '#8c4a55';
    default: return 'var(--primary)';
  }
};

const CategoryBadge = ({ category }) => (
  <div className="badge badge--category" style={{ color: getCategoryColor(category) }}>
    {category}
  </div>
);

export default CategoryBadge;
