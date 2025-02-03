import { useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import { menuData } from './data/menudata';
import Header from './components/header';
import MenuSection from './components/menusection';
import Cart from './components/cart';
import OrderConfirmation from './components/orderconfirmation';
import OrderSuccess from './components/ordersuccess';

const SearchFilter = ({ onSearch, onPriceRangeChange }) => {
  return (
    <div className="search-filter">
      <Row className="g-2">
        <Col md={6}>
          <InputGroup className="search-input-group" size="sm">
            <InputGroup.Text className="search-icon">
              <FaSearch size={14} />
            </InputGroup.Text>
            <Form.Control
              className="search-input"
              type="text"
              placeholder="Cari menu..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select 
            className="price-select"
            onChange={(e) => onPriceRangeChange(e.target.value)}
            size="sm"
          >
            <option value="all">Semua Harga</option>
            <option value="0-10000">Rp 0 - Rp 10.000</option>
            <option value="10001-20000">Rp 10.001 - Rp 20.000</option>
            <option value="20001-above">Lebih dari Rp 20.000</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  // Simple filter function
  const filterItems = (items) => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesPriceRange = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (max === undefined) {
          matchesPriceRange = item.price >= min;
        } else {
          matchesPriceRange = item.price >= min && item.price <= max;
        }
      }

      return matchesSearch && matchesPriceRange;
    });
  };

  const handleAddToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(true);
  };

  const handleFinalConfirm = (note) => {
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setCartItems([]);
  };

  return (
    <Container className="py-5">
      <Header
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <SearchFilter
        onSearch={setSearchQuery}
        onPriceRangeChange={setPriceRange}
      />

      <Row>
        <Col lg={8}>
          {activeSection === 'food' && (
            <MenuSection 
              title="Makanan"
              items={filterItems(menuData.food)}
              onAddToCart={handleAddToCart} 
            />
          )}
          {activeSection === 'drinks' && (
            <MenuSection  
              title="Minuman"
              items={filterItems(menuData.drinks)}
              onAddToCart={handleAddToCart} 
            />
          )}
          {activeSection === 'sideDishes' && (
            <MenuSection 
              title="Cemilan"
              items={filterItems(menuData.sideDishes)}
              onAddToCart={handleAddToCart} 
            />
          )}
        </Col>
        <Col lg={4}>
          <Cart 
            items={cartItems}
            onRemoveItem={handleRemoveItem}
            onConfirmOrder={handleConfirmOrder}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </Col>
      </Row>

      <OrderConfirmation
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        orderDetails={cartItems}
        onConfirm={handleFinalConfirm}
      />

      <OrderSuccess
        show={showSuccess}
        onClose={handleCloseSuccess}
      />
    </Container>
  );
}

export default App;