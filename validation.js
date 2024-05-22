require('validator');
// const {React,useState} = require('react');

const isValidEmail = (email) => {
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
};

const isValidPhone = (phone) => {
    
    const phoneRegex = /^\d{10}$/;
   
    return phoneRegex.test(phone);
};

module.exports = {
    isValidEmail,
    isValidPhone
};