import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RC/RelatedProducts.jsx'
import YourOutfit from './RC/YourOutfit.jsx'
import config from '../../../config.js'
import { AiOutlineStar } from 'react-icons/ai';

const RelatedAndComparison = () => {
  const [currentInfo, setCurrentInfo] = useState([]);
  const [relatedIDs, setRelatedIDs] = useState([]);
  const [relatedInfo, setRelatedInfo] = useState([]);
  const [relatedStyles, setRelatedStyles] = useState([]);

  const productID = 65631;

  useEffect(() => {
    let one = `/products/${productID}`
    let two = `/products/${productID}/related`

    const Axios = axios.create({
      baseURL: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/`,
      headers: {
        'Authorization': config.API_KEY
      }
    });

    const getCurrentInfo = () => {
      return Axios.get(one, {
        transformResponse: [(data) => {
          data = JSON.parse(data);
          let { id, name, category, default_price, features } = data;
          return { id, name, category, default_price, features };
        }]
      })
    }

    const getRelatedIDs = () => {
      return Axios.get(two, (data) => {return data})
    }

    Promise.all([getCurrentInfo(), getRelatedIDs()])
      .then((...res) => {
        const currentInfo = res[0][0].data;
        const relatedIDs = res[0][1].data;
        setCurrentInfo(currentInfo);
        setRelatedIDs(relatedIDs);
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const infoPromises = [];
    const stylePromises = [];

    relatedIDs.forEach(id => {
      let one = `/products/${id}`
      let two = `/products/${id}/styles`

      const Axios = axios.create({
        baseURL: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/`,
        headers: {
          'Authorization': config.API_KEY
        }
      })

      const getRelatedInfo = () => {
        return Axios.get(one, {
          transformResponse: [(data) => {
            data = JSON.parse(data);
            let { id, name, category, default_price, features } = data;
            return { id, name, category, default_price, features };
          }]
        })
      }
      infoPromises.push(getRelatedInfo());

      const getRelatedStyles = () => {
        return Axios.get(two, (data) => {return data})
      }
      stylePromises.push(getRelatedStyles());

    })

    Promise.all(infoPromises)
    // .then(res => setRelatedInfo(res))
    .then(res => console.log(res))
    .catch(err => console.log(err))

    Promise.all(stylePromises)
    // .then(res => setRelatedStyles(res))
    .then(res => console.log(res))
    .catch(err => console.log(err))
  })

    return (<div>LOADING</div>)

}

export default RelatedAndComparison;