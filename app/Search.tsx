import { useState } from 'react';
import products from './data/sample-products'; // Adjust the path as needed

interface SearchProps {
  onVariantSelect: (variant: any) => void;
}

const Search: React.FC<SearchProps> = ({ onVariantSelect }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for products..."
        className="border p-2 rounded w-full mb-4"
      />
      <ul className="list-none">
        {filteredProducts.map(product => (
          <li key={product.id}>
            <button
              onClick={() => onVariantSelect(product.variants[0])} // Adjust the logic to select the appropriate variant
              className="block text-left p-2 border rounded mb-2 w-full"
            >
              {product.title} - ${product.variants[0].price}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
