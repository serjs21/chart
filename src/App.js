import React, {useState, useEffect} from 'react';
import './App.scss';
import data from 'assets/data.json';
import { Chart, Select, ProgressBar } from 'components';
import { normalizeData } from 'utils/normalize';
import { measureTime, memo } from 'utils/cache';

const itemsCountOptions = [10, 20, 30, 50, 100, 150];

const seriesFilterOptions = ['All', 'A', 'B', 'C', 'D'];
const itemToOption = (item) => ({label: item.toString(), value: item});

const App = () => {
  const [itemsCount, setItemsCount] = useState(100);
  const [segment, setSegment] = useState('All');
  const [displayed, setDisplayed] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterTime, setFilterTime] = useState();
  const [initialFilterTime, setInitialFilterTime] = useState();
  const [initialSliceTime, setInitialSliceTime] = useState();
  const [lastFilterTime, setLastFilter] = useState();
  const [lastSliceTime, setLastSliceTime] = useState();

  useEffect(() => {
    const time = measureTime(() => {
        const items = data.slice(0, itemsCount);
        setDisplayed(normalizeData(items));
        });

        if (!initialSliceTime) setInitialSliceTime(time);
        else setLastSliceTime(time);
  }, [itemsCount]);

  useEffect(() => {
      const time = measureTime(() => {
      let filtered;
      if (segment === 'All') {
        filtered = displayed;
      } else {
        filtered = displayed.map(item => {
            const key = 'segment' + segment;
            return {[key]: item[key]}
        })
      }
      setFiltered(filtered)
      });

      if (!initialFilterTime) setInitialFilterTime(time);
      else setLastFilter(time);

    }, [segment, displayed]);


  return (
    <div className="App">
        <div className='filters'>
            <Select options={itemsCountOptions.map(itemToOption)}
                    placeholder='Select amount of entries'
                    onSelect={setItemsCount}
                    defaultValue={100}/>

            <Select options={seriesFilterOptions.map(itemToOption)}
                    placeholder='Select Segment'
                    onSelect={setSegment}
                    defaultValue={'All'}
                    />
        </div>
        <div>
         <div className='filter-time'>Initial filter time: {initialFilterTime >= 0 ? (initialFilterTime + initialSliceTime) + ' ms': '--'} </div>
          <ProgressBar total={initialFilterTime + initialSliceTime} value={lastFilterTime || 0 + lastSliceTime || 0}/>
        </div>
      <Chart data={filtered} width={1000} height={400}/>
    </div>
  );
}

export default App;
