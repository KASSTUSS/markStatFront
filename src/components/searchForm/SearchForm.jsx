import React from 'react';
import { useState } from 'react';
import { useKeyPress } from '../../hooks/useKeyPress';

import UIButton from '../button/UIButton';
import UIInput from '../inputText/UIInput';
import ResultList from '../resultList/ResultList';
import Loader from '../loader/Loader';

import classes from './SearchForm.module.css';

const SearchForm = (props) => {

    const [surname, setSurname] = useState('');
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    const [classForm, setClassForm] = useState(classes.form);
    const [classContent, setclassContent] = useState(classes.content + ' ' + classes.hidden);

    const startSearch = () => { 
        if(!loader) {
            setData([]);
            setClassForm(classes.form + ' ' + classes.move_form);
            setLoader(true);

            setTimeout(function() {
                setclassContent(classes.content)
            }, 350);
            
            fetch('https://markstat-back.onrender.com/api?surname=' + surname)
                .then( res => res.json() )
                .then( res => {
                    setclassContent(classes.content + ' ' + classes.hidden)
                    setTimeout(function() {
                        setLoader(false);
                        setData(res.data.message);
                        console.log(res.message);
                        setclassContent(classes.content);
                    }, 300);
                });
        } else
            return;
    };

    

    return (
        <div className={classes.container}>
            <div className={classForm}>
                <div>
                    <UIInput 
                        type='text' 
                        placeholder='Введите фамилию...' 
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) startSearch();
                        }}
                    />
                    <UIButton 
                        onClick={startSearch}
                        className={classes.searchButton}
                    >
                        Поиск
                    </UIButton>
                </div>
            </div>
            <div className={classContent}>
                {
                    data[0] ? <ResultList data={data}></ResultList> : loader ? <Loader></Loader> : ''
                }
            </div>
            
        </div>
    )
};

export default SearchForm;
