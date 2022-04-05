import { useEffect, useState, useRef } from 'react'
import { useFetch } from './hooks/useFetch'

import Selector from './components/Selector'
import Hotrank from './components/Hotrank'
import Cards from './components/Cards'
import Loading from './components/Loading'

import './App.css';

function App() {
  const { data, isPending, error } = useFetch('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json')
  const [recordData, setRecordData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [selected, setSelected] = useState('')
  const elementTop = useRef()

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  window.addEventListener('scroll', function() {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      elementTop.current.style.opacity = '1'
    } 
    else if (scrolled <= 300){
      elementTop.current.style.opacity = '0'
    }
  });
  

  const handleSelect = (val) => {
    setSelected(val)
  }
  useEffect(() => {
    if(data) {
      setRecordData(data.result.records)
      let newData = []
      let items = selected === '' ? data.result.records : data.result.records.filter(item => item.Zone === selected)
      
      items.forEach((item, i) => {
        if(i % 10 === 0) {
          newData.push([])
        }
        const page = parseInt(i / 10)
        newData[page].push(item)
      })

      setFilterData(newData)
      console.log(filterData)
    }
  }, [data, selected])

  return (
    <div className="App">
      {error && <p>Oops! Some errors occur.</p>}
      {isPending && <Loading></Loading>}
      <header className="header">
        <div className="bg-img"></div>
        <h1>高雄旅遊資訊</h1>
        <Selector data={recordData} handleSelect={handleSelect} selected={selected}></Selector>
      </header>
      <Hotrank handleSelect={handleSelect}></Hotrank>
      <div className="container">
        <div className="hr-padding">
          <hr/>
          <div className="icon-down"></div>
        </div>
        <h2 className="title">{selected}</h2>
        <Cards data={filterData}></Cards>
      </div>
      <div className="gotop" onClick={scrollTop} ref={elementTop}>
            <i className="fa fa-angle-double-up"></i>
        </div>
      <footer>
        <p>高雄旅遊網</p>
        <p>資料來源：高雄市政府</p>
      </footer>
    </div>
  );
}

export default App;
