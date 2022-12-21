import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import AlertState from './Context/Alert/AlertState';
import AuthState from './Context/Auth/AuthState';
import Main from './Components/Main';
import ItemState from './Context/Items/ItemState';
import CartState from './Context/Cart/CartState';
import OrderState from './Context/Order/OrderState';

function App() {
  return <Router>
    <AlertState>
      <AuthState>
        <ItemState>
          <CartState>
            <OrderState>
              <Main />
            </OrderState>
          </CartState>
        </ItemState>
      </AuthState>
    </AlertState>
  </Router>
}

export default App;
