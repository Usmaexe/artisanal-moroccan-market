"use client";

import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import Image from 'next/image';
import Link from 'next/link';

type AddressFormData = {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  saveInfo?: boolean;
};

type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  // State for shipping information
  const [addressData, setAddressData] = useState<AddressFormData>({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
    email: '',
    saveInfo: true
  });

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
  });

  // Calculate order totals
  const shippingCost = subtotal >= 150 ? 0 : 15;
  const taxRate = 0.08;
  const taxAmount = subtotal * taxRate;
  const totalCost = subtotal + shippingCost + taxAmount;

  // Handle address form changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setAddressData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Handle card data changes
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order placed with:', { addressData, paymentMethod, cardData });
    // In a real app, you would send this data to your backend
    // and redirect to an order confirmation page
  };

  // Simplified validation
  const isFormValid = () => {
    const requiredAddressFields = ['firstName', 'lastName', 'address', 'city', 'state', 'postalCode', 'country', 'phone', 'email'];
    const addressValid = requiredAddressFields.every(field => addressData[field as keyof AddressFormData]);
    
    let paymentValid = true;
    if (paymentMethod === 'credit-card') {
      paymentValid = Object.values(cardData).every(value => value);
    }
    
    return addressValid && paymentValid;
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-heading font-semibold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Button asChild>
            <Link href="/">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-heading font-semibold mb-8 text-morocco-charcoal">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="mb-8">
                <h2 className="text-xl font-heading font-semibold mb-4">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={addressData.firstName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={addressData.lastName}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={addressData.address}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="apartment"
                    name="apartment"
                    value={addressData.apartment}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={addressData.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      name="state"
                      value={addressData.state}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={addressData.postalCode}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    name="country"
                    value={addressData.country}
                    onChange={handleAddressChange}
                    className="w-full border border-input bg-background rounded-md h-10 px-3 py-2"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Morocco">Morocco</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={addressData.phone}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={addressData.email}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    id="saveInfo"
                    name="saveInfo"
                    type="checkbox"
                    checked={addressData.saveInfo}
                    onChange={handleAddressChange}
                    className="h-4 w-4 rounded border-gray-300 text-morocco-terracotta focus:ring-morocco-terracotta"
                  />
                  <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600">
                    Save this information for next time
                  </label>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Payment Information */}
              <div>
                <h2 className="text-xl font-heading font-semibold mb-4">Payment Method</h2>

                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  {/* Credit Card Option */}
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="credit-card" id="payment-cc" />
                    <Label htmlFor="payment-cc" className="flex items-center cursor-pointer">
                      <span>Credit Card</span>
                      <div className="flex ml-4 space-x-2">
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      </div>
                    </Label>
                  </div>

                  {paymentMethod === 'credit-card' && (
                    <div className="pl-6 mb-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.cardNumber}
                          onChange={handleCardChange}
                          required={paymentMethod === 'credit-card'}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input
                          id="nameOnCard"
                          name="nameOnCard"
                          placeholder="John Doe"
                          value={cardData.nameOnCard}
                          onChange={handleCardChange}
                          required={paymentMethod === 'credit-card'}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={cardData.expiryDate}
                            onChange={handleCardChange}
                            required={paymentMethod === 'credit-card'}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            type="password"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            required={paymentMethod === 'credit-card'}
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Option */}
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="paypal" id="payment-paypal" />
                    <Label htmlFor="payment-paypal" className="flex items-center cursor-pointer">
                      <span>PayPal</span>
                      <div className="ml-4 w-10 h-6 bg-gray-200 rounded"></div>
                    </Label>
                  </div>

                  {/* Bank Transfer Option */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank-transfer" id="payment-bank" />
                    <Label htmlFor="payment-bank">Bank Transfer</Label>
                  </div>
                </RadioGroup>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-heading font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="max-h-[300px] overflow-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      <span className="absolute top-0 right-0 bg-morocco-charcoal text-white text-xs rounded-bl-md px-1">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${taxAmount.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-morocco-terracotta">${totalCost.toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full mt-4" type="submit" onClick={handleSubmit} disabled={!isFormValid()}>
                Place Order
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our 
                <Link href="/terms" className="text-morocco-terracotta hover:underline mx-1">
                  Terms and Conditions
                </Link> 
                and 
                <Link href="/privacy" className="text-morocco-terracotta hover:underline ml-1">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
