import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentGateway() {
  const [stripeTotal, setStripeTotal] = useState(0);
  const [razorpayTotal, setRazorpayTotal] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('https://v6.exchangerate-api.com/v6/b93ed4453751ba430e142bc4/latest/USD');
      setExchangeRates(response.data.conversion_rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const convertToUSD = (amount, currency) => {
    if (currency === 'USD') {
      return amount;
    }
    const rate = exchangeRates[currency];
    if (rate) {
      return amount / rate; // Convert amount to USD
    }
    return amount; // Assume already in USD if no conversion rate found
  };

  useEffect(() => {
    fetchExchangeRates();

    // Fetch Stripe payments
    const fetchStripePayments = async () => {
      try {
        const response = await axios.get('https://api.lokivpn.com/api/stripe/orders');
        const payments = response.data;
        const successfulPayments = payments.filter(payment => payment.status === 'succeeded');
        const totalAmount = successfulPayments.reduce((sum, payment) => sum + payment.amount_received, 0);
        setStripeTotal(totalAmount / 100); // Convert cents to dollars
        console.log('Stripe Total:', totalAmount / 100); // Debug log
      } catch (error) {
        console.error('Error fetching Stripe payments:', error);
      }
    };

    // Fetch Razorpay payments
    const fetchRazorpayPayments = async () => {
      try {
        const response = await axios.get('https://api.lokivpn.com/api/razorpay/orders1');
        const payments = response.data.items; // Make sure to use response.data.items
        console.log('Razorpay Payments:', payments); // Debug log

        const successfulPayments = payments.filter(payment => payment.status === 'paid');
        const totalAmount = successfulPayments.reduce((sum, payment) => {
          const amountInUSD = convertToUSD(payment.amount_paid / 100, payment.currency); // Convert paise to rupees first
          return sum + amountInUSD;
        }, 0);
        setRazorpayTotal(totalAmount);
        console.log('Razorpay Total:', totalAmount); // Debug log
      } catch (error) {
        console.error('Error fetching Razorpay payments:', error);
      }
    };

    fetchStripePayments();
    fetchRazorpayPayments();
  }, [exchangeRates]);

  return (
    <div className='flex'>
      <div className="flex-1 bg-gray-100 p-6 w-[75vw]">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-red-600">Payment Method</h1>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Total Payment</h2>
            <p className="text-2xl text-green-400 font-bold">${(stripeTotal + razorpayTotal).toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Razorpay</h2>
            <p className="text-2xl text-green-400 font-bold">${razorpayTotal.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">Stripe</h2>
            <p className="text-2xl text-green-400 font-bold">${stripeTotal.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold text-black">CoinGate</h2>
            <p className="text-2xl text-green-400 font-bold">$0.00</p> {/* Placeholder */}
          </div>
        </div>
        <h1 className="text-2xl font-bold text-red-600 mt-4 mb-4">Overview</h1>
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4 text-black">
            <div className="bg-white p-4 shadow rounded">
              <p className='font-bold'>Today</p>
              <p>$30.00</p> {/* Placeholder */}
            </div>
            <div className='bg-white p-4 shadow rounded'>
              <p className='font-bold'>Weekly</p>
              <p>$123.00</p> {/* Placeholder */}
            </div>
            <div className='bg-white p-4 shadow rounded'>
              <p className='font-bold'>Monthly</p>
              <p>$2047.00</p> {/* Placeholder */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;
