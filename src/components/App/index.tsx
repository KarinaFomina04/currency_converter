import React from "react";
import Block from '../Block';
import style from './App.module.scss'

const App: React.FC = () => {

  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState<any>(0);
  const [toPrice, setToPrice] = React.useState<any>(1);

  const ratesRef = React.useRef<any>({});

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((json) => {
      ratesRef.current = json.rates;
      onChangeToPrice(1);
    })
      .catch((err) => {
        console.warn(err);
        alert('Unable to obtain information.');
      });
  },[]);

  const onChangeFromPrice = (value: number) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value: number) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency]);

  return (
    <div className={style.App}>
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  )

}

export default App;