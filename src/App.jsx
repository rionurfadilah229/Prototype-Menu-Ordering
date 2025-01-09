import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { menuData } from './data/menudata';
import Header from './components/header';
import MenuSection from './components/menusection';
import Cart from './components/cart';
import OrderConfirmation from './components/orderconfirmation';
import OrderSuccess from './components/ordersuccess';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('food');

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

  const handleFinalConfirm = () => {
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
      
      <Row>
        <Col lg={8}>
          {activeSection === 'food' && (
            <MenuSection 
              items={menuData.food} 
              onAddToCart={handleAddToCart} 
            />
          )}
          {activeSection === 'drinks' && (
            <MenuSection  
              items={menuData.drinks} 
              onAddToCart={handleAddToCart} 
            />
          )}
          {activeSection === 'sideDishes' && (
            <MenuSection 
              items={menuData.sideDishes} 
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