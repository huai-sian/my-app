import { useEffect, useState, useRef } from 'react'
import { useFetch } from './hooks/useFetch'
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled'
import Selector from './components/Selector'
import Hotrank from './components/Hotrank'
import Cards from './components/Cards'
import Loading from './components/Loading'
import { fetchData } from './model/reducer'

import './App.css';

const Footer = styled.footer`
  position:relative;
  width:100%;
  height:auto;
  background-color:#8A82CC;
  color:white;
  bottom:0;
  text-align:center;
  clear:both;
  padding:1rem 0;
  p:nth-of-type(1) {
    margin-bottom:10px;
  }
`;

const Gotop = styled.div`
  position:fixed;
  right:1.2rem;
  bottom:1.5rem;
  width:2rem;
  height:2rem;
  background-color:#8A82CC;
  cursor:pointer;
  z-index:2;
  transition: all .5s;

  & > i{
    line-height:2rem;
    font-size:1.3rem;
    text-indent:0.2rem;
    color:white;
  }
`;

const Header = styled.header`
  & h1 {
    padding-top:30px;
    text-align:center;
    color: white;
    font-size:3rem;
    margin:0;
    letter-spacing:2px;   
  }
`;

const IconDown = styled.div`
  background:#ffff url(http://i.imgur.com/fYLc1at.png) center no-repeat;
  align-content: center;
  position: relative; 
  top:-28px;
  margin: 0 auto;
  border-radius: 50px;
  border: 1px solid #559AC8;
  height: 24px;
  width: 24px;
`

function App() {
  const [selected, setSelected] = useState('')
  const recordData = useSelector(state => state.recordData);
  const filterData = useSelector(state => state.filterData);
  const data = useSelector(state => state.data);
  const isPending = useSelector(state => state.isPending);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  const elementTop = useRef();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  window.addEventListener('scroll', function() {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      if(elementTop.current) {
        elementTop.current.style.opacity = '1'
      }
       
    } 
    else if (scrolled <= 300){
      if(elementTop.current) {
        elementTop.current.style.opacity = '0'
      }
    }
  });
  

  const handleSelect = (val) => {
    setSelected(val)
  }
  useEffect(() => {
    dispatch(fetchData());
    console.log(data);
  }, []);

  useEffect(() => {
    if(data) {
      dispatch(fetchData(selected));
      console.log(data);
    }
  }, [selected])

  return (
    <div className="App">
      {error && <p>Oops! Some errors occur.</p>}
      {isPending && <Loading></Loading>}
      <Header>
        <div className="bg-img"></div>
        <h1>高雄旅遊資訊</h1>
        <Selector data={recordData} handleSelect={handleSelect} selected={selected}></Selector>
      </Header>
      <Hotrank handleSelect={handleSelect}></Hotrank>
      <div className="container">
        <div className="hr-padding">
          <hr/>
          <IconDown></IconDown>
        </div>
        <h2 className="title">{selected}</h2>
        <Cards data={filterData} selected={selected}></Cards>
      </div>
      <Gotop className="gotop" onClick={scrollTop} ref={elementTop}>
        <i className="fa fa-angle-double-up"></i>
      </Gotop>
      <Footer>
        <p>高雄旅遊網</p>
        <p>資料來源：高雄市政府</p>
      </Footer>
    </div>
  );
}

export default App;
