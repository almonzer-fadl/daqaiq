import React from 'react';

const Categories = () => {
  const categories = [
    { image: 'https://via.placeholder.com/150', name: 'Category 1' },
    { image: 'https://via.placeholder.com/150', name: 'Category 2' },
    { image: 'https://via.placeholder.com/150', name: 'Category 3' },
    { image: 'https://via.placeholder.com/150', name: 'Category 4' },
    { image: 'https://via.placeholder.com/150', name: 'Category 5' },
    { image: 'https://via.placeholder.com/150', name: 'Category 6' },
    { image: 'https://via.placeholder.com/150', name: 'Category 7' },
    { image: 'https://via.placeholder.com/150', name: 'Category 8' },
  ];

  return (
    <div className="carousel rounded-box relative shadow-xl p-4 mt-8">
      {categories.map((category, index) => (
        <div key={index} className="carousel-item">
          <div className="card bg-base-100 shadow-2xl mx-2">
            <figure className="px-10 pt-10">
              <img src={category.image} alt={category.name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">{category.name}</h3>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button className="btn btn-circle">❮</button>
        <button className="btn btn-circle">❯</button>
      </div>
    </div>
  );
};

export default Categories;
