import * as echarts from 'echarts';
import { useRef, useEffect,useState } from 'react';
import { articleStore,tagStore } from '../../store'
const Table = () => {
  const tableRef = useRef(null);
  const myChartRef = useRef(null); 
  const { articles } = articleStore();
  const { tags } = tagStore();
  const [ articleList, setArticleList ] = useState([]);
  useEffect(() => {
      const grouped = tags.map(tag =>
          articles.filter(article => article.tag === tag.name)
      );
      setArticleList(grouped);
  }, [articles,tags]);
  useEffect(() => {
    if (tableRef.current) {
      myChartRef.current = echarts.init(tableRef.current);
      myChartRef.current.setOption({
        title: {
          text: ''
        },
        tooltip: {}, 
        xAxis: {
          type: 'category', 
          data: tags.map(tag => tag.name) 
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '文章',
            type: 'bar',
            data: articleList.map(tag => tag.length), 
            itemStyle: {
                color: '#4495F6'
            }
          }
        ]
      });
    }
  }, [articleList, tags]); 
  return (
    <div ref={tableRef} id="tableFather" style={{ width: '30rem', height: '20rem' }}></div>
  );
};

export default Table;