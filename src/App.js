import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Splash from './components/splashscreen/Splash';
import Mainscreen from './components/mainscreen/Mainscreen';
import Breakfast from './components/Outline/Breakfast/Breakfast';
import Bar from './components/Outline/Bar/Bar';
import Grill from './components/Outline/Grill/Grill';
import CardPrice from './components/Complite/CardPrice/CardPrice';
import Burgers from './components/Outline/Burgers/Burgers';
import Hot from './components/Outline/Hot/Hot';
import HotSnacks from './components/Outline/HotSnacks/HotSnacks';
import ScrollToTop from './components/ScrollToTop';
import Soups from './components/Outline/Soups/Soups';
import Salads from './components/Outline/Salads/Salads';
import Dough from './components/Outline/Dough/Dough';
import ColdSnacks from './components/Outline/ColdSnacks/ColdSnacks';
import Garnish from './components/Outline/Garnish/Garnish';
import IceCream from './components/Outline/IceCream/IceCream';
import Souses from './components/Outline/Souses/Souses';
import Dishes from './components/Outline/Breakfast/Dishes/Dishes';
import Drinks from './components/Outline/Breakfast/Drinks/Drinks';
import ColdDrinks from './components/Outline/Bar/ColdDrinks/ColdDrinks';
import Limonades from './components/Outline/Bar/Limonades/Limonades';
import Coffe from './components/Outline/Bar/Coffee/Coffe';
import Tea from './components/Outline/Bar/Tea/Tea';
import ComTea from './components/Outline/Bar/ComTea/ComTea';
import Beer from './components/Outline/Bar/Beer/Beer';
import Kebabs from './components/Outline/Grill/Kebabs/Kebabs';
import Steaks from './components/Outline/Grill/Steaks/Steaks';
import Fish from './components/Outline/Grill/Fish/Fish';
import HotDrinks from './components/Outline/Bar/HotDrinks/HotDrinks';
import BeerDrinks from './components/Outline/Bar/BeerDrinks/BeerDrinks';
import { CartProvider } from './components/Contextes/CartContext';
import Basket from './components/Basket/Basket';
import Inline from './components/Inline/Breakfast/Dishes/Inline';
import DrinksIn from './components/Inline/Breakfast/Drinks/DrinksIn';
import BarIn from './components/Inline/Bar/Cold/BarIn';
import RecomHot from './components/Inline/Bar/Hot/RecomHot/RecomHot';
import HotIn from './components/Inline/Bar/Hot/HotIn';
import KebabIn from './components/Inline/Grill/Kebabs/KebabIn';
import SteaksIn from './components/Inline/Grill/Steaks/SteaksIn';
import FishIn from './components/Inline/Grill/Fish/FishIn';
import BurgersIn from './components/Inline/Burgers/BurgersIn';
import HotbIn from './components/Inline/Hot/HotbIn';
import HotSnacksIn from './components/Inline/HotSnaks/HotSnacksIn';
import SaladsIn from './components/Inline/Salads/SaladsIn';
import SoupsIn from './components/Inline/Soups/SoupsIn';
import DoughIn from './components/Inline/Dough/DoughIn';
import ColdSnacksIn from './components/Inline/ColdSnacks/ColdSnaksIn';
import GarnishIn from './components/Inline/Garnish/GarnishIn';
import IceIn from './components/Inline/Ice/IceIn';
import SousesIn from './components/Inline/Souses/SousesIn';
import RegRest from './components/Registration/RegRest/RegRest';
import Time from './components/Registration/RegRest/Period/Time';
import Day from './components/Registration/RegRest/Period/Day';
import Morning from './components/Registration/RegRest/Period/Morning';
import Evening from './components/Registration/RegRest/Period/Evening';
import RegDel from './components/Registration/RegDel/RegDel';
import TimeDel from './components/Registration/RegDel/TimeDel';
import DayDel from './components/Registration/RegDel/DayDel';
import EveningDel from './components/Registration/RegDel/EveningDel';
import Address from './components/Registration/RegDel/Address/Address';
import SunVill from './components/Registration/RegDel/SunVill/SunVill';
import FlatDel from './components/Registration/RegDel/Address/FlatDel/FlatDel';
import { DeliveryProvider } from './components/Contextes/RegContext';
import HouseDel from './components/Registration/RegDel/Address/HouseDel/HouseDel';
import Hotels from './components/Registration/RegDel/Address/Hotels/Hotels';
import Success from './components/succsess';
import {useQuery} from '../src/components/utils/util';





const App = () => {

  const query = useQuery();
    const chatId = query.get('chatId');


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (

    

    <CartProvider>
      <DeliveryProvider>
    <Router>
      <ScrollToTop/>
      <div className="App">


        {loading ? (
          <Splash />
        ) : (
          <Routes>
            <Route path="/" element={<Mainscreen />} />
            <Route path="/breakfast" element={<Breakfast />} />
            <Route path="bar" element={<Bar />} />
            <Route path="grill" element={<Grill />} />
            <Route path="burgers" element={<Burgers/>} />
            <Route path="hot" element={<Hot/>} />
            <Route path="hotSnacks" element={<HotSnacks/>} />
            <Route path="soups" element={<Soups/>} />
            <Route path="salads" element={<Salads/>} />
            <Route path="dough" element={<Dough/>} />
            <Route path="coldSnacks" element={<ColdSnacks/>} />
            <Route path="garnishes" element={<Garnish/>} />
            <Route path="icecreams" element={<IceCream/>} />
            <Route path="souses" element={<Souses/>} />
            <Route path="dishes" element={<Dishes/>} />
            <Route path="drinks" element={<Drinks/>} />
            <Route path="colddrinks" element={<ColdDrinks/>} />
            <Route path="limonades" element={<Limonades/>} />
            <Route path="coffee" element={<Coffe/>} />
            <Route path="tea" element={<Tea/>} />
            <Route path="comtea" element={<ComTea/>} />
            <Route path="beer" element={<Beer/>} />
            <Route path="kebabs" element={<Kebabs/>} />
            <Route path="steaks" element={<Steaks/>} />
            <Route path="fish" element={<Fish/>} />
            <Route path="hotdrinks" element={<HotDrinks/>} />
            <Route path="beerdrinks" element={<BeerDrinks/>} />
            <Route path="basket" element={<Basket />} />
            <Route path="/inline" element={<Inline />} />
            <Route path="/drinksIn" element={<DrinksIn />} />
            <Route path="/barin" element={<BarIn />} />
            <Route path="/barhot" element={<HotIn />} />
            <Route path="/kebabIn" element={<KebabIn />} />
            <Route path="/steaksIn" element={<SteaksIn />} />
            <Route path="/fishIn" element={<FishIn />} />
            <Route path="/burgersIn" element={<BurgersIn />} />
            <Route path="/hotbIn" element={<HotbIn />} />
            <Route path="/hotsnacksIn" element={<HotSnacksIn />} />
            <Route path="/saladsIn" element={<SaladsIn />} />
            <Route path="/soupsIn" element={<SoupsIn />} />
            <Route path="/doughIn" element={<DoughIn />} />
            <Route path="/coldsnacksIn" element={<ColdSnacksIn />} />
            <Route path="/garnishIn" element={<GarnishIn />} />
            <Route path="/iceIn" element={<IceIn />} />
            <Route path="/sousesIn" element={<SousesIn />} />   
            <Route path="/regrest" element={<RegRest chatId={chatId} />} />
            <Route path="/time" element={<Time />} />
            <Route path="/day" element={<Day />} />
            <Route path="/morning" element={<Morning />} />
            <Route path="/evening" element={<Evening />} />
            <Route path="regdel" element={<RegDel />} />
            <Route path="/time" element={<Time />} />
            <Route path="/day" element={<Day />} />
            <Route path="/morning" element={<Morning />} />
            <Route path="/evening" element={<Evening />} />
            <Route path="/regdel" element={<RegDel chatId={chatId} />} />
            <Route path="/timedel" element={<TimeDel />} />
            <Route path="/daydel" element={<DayDel />} />
            <Route path="/eveningdel" element={<EveningDel />} />
            <Route path="/address" element={<Address />} />
            <Route path="/sunvill" element={<SunVill />} />
            <Route path="/flatdel" element={<FlatDel />} />
            <Route path="/housedel" element={<HouseDel />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/success" element={<Success />} />

          </Routes>
        )}
    
      </div>
    </Router>
    </DeliveryProvider>
    </CartProvider>
  );
};

export default App;

