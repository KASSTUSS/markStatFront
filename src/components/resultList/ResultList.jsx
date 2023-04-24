import React from 'react';
import { useState } from 'react';
import { Chart as ChartJS, 
    ArcElement, 
    BarElement,
    Tooltip, 
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import classes from './ResultList.module.css';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

ChartJS.register(
    ArcElement, 
    BarElement,
    Tooltip, 
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);
const getListOfNumbers = (count) => {
    const list = new Array(count);
    for( let i = 0; i < count; i++ ) {
        list[i] = i+1;
    }
    return list;
};

const ResultList = ({data, ...props}) => {

    const [classItemActive, setClassItemActive] = useState(classes.item_active);
    const [classHeaderActive, setClassHeaderActive] = useState(classes.header_active);
    const [activeElem, setActiveElem] = useState(null);
    const [coordinateY, setCoordinateY] = useState(125);
    const [dataForChart, setDataForChart] = useState({
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0
                    ],
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    ],
                    borderWidth: 1,
                }
            ]
        }
    );
    const [dataForChartLine, setDataForChartLine] = useState({
        labels: [],
        datasets: [
            {
                label: 'Средний балл за семестр',
                data: [0],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    });
    const [dataForChartLineProgress, setDataForChartLineProgress] = useState({
        labels: [],
        datasets: [
            {
                label: 'Динамика среднего балла',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    });

    const openItem = (e, key) => {

        const itemElem = document.getElementsByClassName(classes.item).item(key-1);
        const activeElem = document.getElementsByClassName(classItemActive).item(0);

        setActiveElem(data[key-1]);
        setCoordinateY(itemElem.getBoundingClientRect().y);
        setClassHeaderActive(classes.header_active + ' ' + classes.active_header);
        setTimeout(() => {
            document.getElementsByClassName(classes.header_active).item(0).style.opacity = '1';
            setClassItemActive(classes.item_active + ' ' + classes.active); 
            activeElem.style.top = itemElem.getBoundingClientRect().y + 'px';
            setTimeout(() => {
                activeElem.style.top = 125 + 'px';
                activeElem.style.width = '100%';
                activeElem.style.height = 'calc(100% - 125px)';
                activeElem.style.borderRadius = '0px';
                activeElem.style.backgroundColor = '#3D3E52';
                setTimeout(() => {
                    document.getElementsByClassName(classes.header_container).item(0).style.opacity = '1';
                    document.getElementsByClassName(classes.itemactive_container).item(0).style.opacity = '1';
                }, 250);
            },50);
        }, 0);

        const marks = [
            0,0,0,0,0,0,0,0,0,0
        ];

        const averageMarks = new Array(data[key-1].session.length);
        const averageMarksProgress = new Array(data[key-1].session.length);
        let numOfMarksFull = 0;
    
        data[key-1].session.forEach(session => {
            let sumOfMarks = 0;
            let numOfMarks = 0;
            session.marks.forEach(mark => {
                if(typeof mark.result == 'number') {
                    ++numOfMarks;
                    ++numOfMarksFull;
                    marks[mark.result-1] = marks[mark.result-1] + 1;
                    sumOfMarks += mark.result;
                }
            });
            averageMarks[session.sessionNumber-1] = parseFloat((sumOfMarks / numOfMarks).toFixed(2));
        });

        for( let i = 0; i < averageMarks.length-1; i++ ) {
            averageMarksProgress[i] = averageMarks[i+1] - averageMarks[i]
        }

        setDataForChart({
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
                {
                    label: 'Процент отметок, %',
                    data: [
                        (marks[0]/numOfMarksFull*100).toFixed(2),
                        (marks[1]/numOfMarksFull*100).toFixed(2),
                        (marks[2]/numOfMarksFull*100).toFixed(2),
                        (marks[3]/numOfMarksFull*100).toFixed(2),
                        (marks[4]/numOfMarksFull*100).toFixed(2),
                        (marks[5]/numOfMarksFull*100).toFixed(2),
                        (marks[6]/numOfMarksFull*100).toFixed(2),
                        (marks[7]/numOfMarksFull*100).toFixed(2),
                        (marks[8]/numOfMarksFull*100).toFixed(2),
                        (marks[9]/numOfMarksFull*100).toFixed(2)
                    ],
                    backgroundColor: [
                        '#B21700',
                        '#D5591E',
                        '#FF593D',
                        '#FF737E',
                        '#FF9B69',
                        '#FFD84B',
                        '#D7FF3F',
                        '#83FF69',
                        '#00FFC2',
                        '#00FFFF',
                    ],
                    borderColor: [
                        '#B21700',
                        '#D5591E',
                        '#FF593D',
                        '#FF737E',
                        '#FF9B69',
                        '#FFD84B',
                        '#D7FF3F',
                        '#83FF69',
                        '#00FFC2',
                        '#00FFFF',
                    ],
                    borderWidth: 1,
                },
            ],
            options: {
                animations: {
                  tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                  }
                }
              }
        });
        setDataForChartLine({
            labels: getListOfNumbers(averageMarks.length).map( (i) => {
                return 'Семестр ' + i;
            }),
            datasets: [
                {
                    label: 'Средний балл за семестр',
                    data: averageMarks,
                    backgroundColor: 'rgba(109, 115, 213, 0.85)',
                    borderColor: 'rgba(109, 115, 213, 0.7)',
                }
            ]
        });
        setDataForChartLineProgress({
            labels: getListOfNumbers(averageMarksProgress.length),
            datasets: [
                {
                    label: 'Динамика среднего балла',
                    data: averageMarksProgress,
                    backgroundColor: averageMarksProgress.map( (progress) =>{
                        return (progress >= 0) ? 'rgba(99, 255, 132, 0.65)': 'rgba(255, 99, 132, 0.65)';
                    })
                }
            ]
        });
    };

    const backToSerch = () => {
        const activeElem = document.getElementsByClassName(classItemActive).item(0);
        
        activeElem.style.top = coordinateY + 'px';
        activeElem.style.width = '500px';
        activeElem.style.height = '100px';
        activeElem.style.borderRadius = '10px';
        activeElem.style.backgroundColor = '#51536C';
        document.getElementsByClassName(classes.header_container).item(0).style.opacity = '0';
        document.getElementsByClassName(classes.itemactive_container).item(0).style.opacity = '0';
        setTimeout(() => {
            document.getElementsByClassName(classes.header_active).item(0).style.opacity = '0';
        }, 300);
        setTimeout(() => {
            setClassItemActive(classes.item_active);  
            setClassHeaderActive(classes.header_active); 
        },350);
    };

    const listItems = data.map((item) =>
        <li onClick={event => openItem(event, item.id)} className={classes.item} key={item.id}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11.1 35.25q3.15-2.2 6.25-3.375Q20.45 30.7 24 30.7q3.55 0 6.675 1.175t6.275 3.375q2.2-2.7 3.125-5.45Q41 27.05 41 24q0-7.25-4.875-12.125T24 7q-7.25 0-12.125 4.875T7 24q0 3.05.95 5.8t3.15 5.45ZM24 25.5q-2.9 0-4.875-1.975T17.15 18.65q0-2.9 1.975-4.875T24 11.8q2.9 0 4.875 1.975t1.975 4.875q0 2.9-1.975 4.875T24 25.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.775t4.3-6.35q2.725-2.725 6.375-4.3Q19.9 4 24 4q4.15 0 7.775 1.575t6.35 4.3q2.725 2.725 4.3 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.3 6.375-2.725 2.725-6.35 4.3Q28.15 44 24 44Zm0-3q2.75 0 5.375-.8t5.175-2.8q-2.55-1.8-5.2-2.75-2.65-.95-5.35-.95-2.7 0-5.35.95-2.65.95-5.2 2.75 2.55 2 5.175 2.8Q21.25 41 24 41Zm0-18.5q1.7 0 2.775-1.075t1.075-2.775q0-1.7-1.075-2.775T24 14.8q-1.7 0-2.775 1.075T20.15 18.65q0 1.7 1.075 2.775T24 22.5Zm0-3.85Zm0 18.7Z"/></svg>
            <div className={classes.info}>
                <div className={classes.item_fullname}>
                    <span>{item.personalData.surname}</span>
                    <span>{item.personalData.name}</span>
                    <span>{item.personalData.patronymic}</span>
                </div>
                <div className={classes.group_info}>
                    Группа: <span>{item.personalData.group}</span>
                </div>
            </div>
        </li>
    );

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }


      const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <ul className={classes.container}>
            {
                listItems
            }
            <div className={classItemActive}>
                <div className={classes.itemactive_container}>
                    
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Tabs 
                                value={value} 
                                onChange={handleChange} 
                                aria-label="basic tabs example" 
                                textColor="secondary"
                                indicatorColor="secondary"
                                scrollButtons="auto"
                                centered
                            >
                            <Tab label="Все отметки" {...a11yProps(0)} />
                            <Tab label="Средний балл" {...a11yProps(1)} />
                            <Tab label="Динамика среднего балла" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}    
                        >
                            <div className={classes.chart_container}>
                                <Pie
                                    data={dataForChart}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}    
                        >
                            <div className={classes.chart_container}>
                                <Line
                                    data={dataForChartLine}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2}
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}    
                        >
                            <div className={classes.chart_container}>
                                <Bar
                                    data={dataForChartLineProgress}
                                />
                            </div>
                        </TabPanel>
                    </Box>
                    
                    
                    
                </div>
            </div>
            <div className={classHeaderActive}>
                <div className={classes.header_container}>
                    <div onClick={backToSerch} className={classes.header_fullname}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M20 32.792 7.25 20 20 7.292l1.542 1.541-10.125 10.125H32.75v2.125H11.417l10.125 10.125Z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11.1 35.25q3.15-2.2 6.25-3.375Q20.45 30.7 24 30.7q3.55 0 6.675 1.175t6.275 3.375q2.2-2.7 3.125-5.45Q41 27.05 41 24q0-7.25-4.875-12.125T24 7q-7.25 0-12.125 4.875T7 24q0 3.05.95 5.8t3.15 5.45ZM24 25.5q-2.9 0-4.875-1.975T17.15 18.65q0-2.9 1.975-4.875T24 11.8q2.9 0 4.875 1.975t1.975 4.875q0 2.9-1.975 4.875T24 25.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.775t4.3-6.35q2.725-2.725 6.375-4.3Q19.9 4 24 4q4.15 0 7.775 1.575t6.35 4.3q2.725 2.725 4.3 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.3 6.375-2.725 2.725-6.35 4.3Q28.15 44 24 44Zm0-3q2.75 0 5.375-.8t5.175-2.8q-2.55-1.8-5.2-2.75-2.65-.95-5.35-.95-2.7 0-5.35.95-2.65.95-5.2 2.75 2.55 2 5.175 2.8Q21.25 41 24 41Zm0-18.5q1.7 0 2.775-1.075t1.075-2.775q0-1.7-1.075-2.775T24 14.8q-1.7 0-2.775 1.075T20.15 18.65q0 1.7 1.075 2.775T24 22.5Zm0-3.85Zm0 18.7Z"/></svg>
                        <div>
                            <span>{activeElem === null ? '': activeElem.personalData.surname }</span>
                            <span>{activeElem === null ? '': activeElem.personalData.name}</span>
                            <span>{activeElem === null ? '': activeElem.personalData.patronymic}</span>
                        </div>
                    </div>
                    <div className={classes.header_person_info_container}>
                        <div className={classes.person_info_group}>
                            <div className={classes.person_info_label}>Факультет:</div>
                            <div>{activeElem === null ? '': activeElem.personalData.faculty }</div>
                        </div>
                        <div className={classes.person_info_group}>
                            <div className={classes.person_info_label}>Группа:</div>
                            <div>{activeElem === null ? '': activeElem.personalData.group }</div>
                        </div>
                    </div>
                </div>
            </div>
        </ul>
    )
};



export default ResultList;