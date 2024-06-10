import React, { useState, useEffect } from 'react';

const CollegeTable = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ heading: '', gender: '', category: '' });

  useEffect(() => {
    fetch('/output.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredData = data.filter(item => {
    return (
      (filter.heading === '' || item.Heading.includes(filter.heading)) &&
      (filter.gender === '' || item.Gender === filter.gender) &&
      (filter.category === '' || item.Category === filter.category)
    );
  });

  return (
    <div className="container mx-auto">
      <div className="flex mb-4">
        <input
          type="text"
          name="heading"
          placeholder="Filter by Heading"
          value={filter.heading}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="gender"
          placeholder="Filter by Gender"
          value={filter.gender}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Filter by Category"
          value={filter.category}
          onChange={handleFilterChange}
          className="border p-2"
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Heading</th>
            <th className="border border-gray-200 p-2">S.No</th>
            <th className="border border-gray-200 p-2">NEET RANK</th>
            <th className="border border-gray-200 p-2">NEET Roll No</th>
            <th className="border border-gray-200 p-2">Score</th>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Gender</th>
            <th className="border border-gray-200 p-2">Category</th>
            <th className="border border-gray-200 p-2">Local Area</th>
            <th className="border border-gray-200 p-2">Allotment Details</th>
            <th className="border border-gray-200 p-2">Phase</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-200 p-2">{item.Heading}</td>
              <td className="border border-gray-200 p-2">{item['S.No']}</td>
              <td className="border border-gray-200 p-2">{item['NEET RANK']}</td>
              <td className="border border-gray-200 p-2">{item['NEET Roll No']}</td>
              <td className="border border-gray-200 p-2">{item.Score}</td>
              <td className="border border-gray-200 p-2">{item['Name of the Candidate']}</td>
              <td className="border border-gray-200 p-2">{item.Gender}</td>
              <td className="border border-gray-200 p-2">{item.Category}</td>
              <td className="border border-gray-200 p-2">{item['Local Area']}</td>
              <td className="border border-gray-200 p-2">{item['Allotment Details']}</td>
              <td className="border border-gray-200 p-2">{item.Phase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeTable;
