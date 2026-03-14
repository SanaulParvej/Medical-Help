import React from 'react';
import banner from '/public/banner_1.jpg';
import {
	FaTools,
	FaHospital,
	FaRocket,
	FaStar,
	FaHeartbeat,
	FaPills,
	FaUserMd,
	FaPhone,
	FaUserNurse,
	FaShieldAlt,
} from 'react-icons/fa';

const NursingCare = () => {
	const services = [
		{
			icon: FaUserNurse,
			title: 'দক্ষ নািসকােদর সবা',
			description: 'অিভজ্ঞ এবং প্রিশিক্ষত নাস দ্বারা সবা',
		},
		{
			icon: FaShieldAlt,
			title: 'িনরাপদ িচিকৎসা সবা',
			description: 'সেবাচ্চ মােনর িচিকৎসা পিরেষবা িনি ত',
		},
		{
			icon: FaTools,
			title: 'স্বাস্থ্যেসবা পণ্য',
			description: 'আধুিনক যন্ত্রপািত এবং সরঞ্জাম',
		},
		{
			icon: FaHospital,
			title: 'ঘের বেস পিরচযা',
			description: 'আপনার ঘেরই পশাদার িচিকৎসা সবা',
		},
		{
			icon: FaRocket,
			title: 'দ্রুত সবা প্রদান',
			description: 'জরুির পিরিস্থিতেত তাৎক্ষিণক সবা',
		},
		{
			icon: FaStar,
			title: 'চি শ ঘণ্টা সবা',
			description: 'সপ্তােহর সাতিদন চি শ ঘণ্টা উপলব্ধ',
		},
	];

	const pricingPlans = [
		{
			name: 'বিসক সবা',
			price: '৳4,000',
			period: 'প্রিত সপ্তাহ',
			features: [
				'দিনক এক ঘণ্টা',
				'রক্তচাপ মাপা',
				'তাপমাত্রা পিরমাপন',
				'ওষুধ খাওয়ােনা',
				'ব্যিক্তগত যত্ন',
			],
			highlight: false,
		},
		{
			name: 'স্ট্যান্ডাড সবা',
			price: '৳15,000',
			period: 'প্রিত মাস',
			features: [
				'দিনক দুই ঘণ্টা',
				'সম্পূণ শারীিরক পিরচযা',
				'প্রাথিমক িচিকৎসা',
				'ক্ষত পিরচযা',
				'খাবার তিরেত সহায়তা',
				'ঘর পিরষ্কার করা',
			],
			highlight: true,
		},
		{
			name: 'িপ্রিময়াম সবা',
			price: '৳25,000',
			period: 'প্রিত মাস',
			features: [
				'দিনক িতন ঘণ্টা',
				'সম্পূণ িচিকৎসা পিরচযা',
				'িবেশষ রাগীর পিরচযা',
				'িফিজওেথরািপ সহায়তা',
				'চি শ ঘণ্টা যাগােযাগ',
				'জরুির সহায়তা সবা',
			],
			highlight: false,
		},
	];

	const benefits = [
		{
			icon: FaHeartbeat,
			title: 'স্বাস্থ্য পরীক্ষা',
			description: 'িনয়িমত স্বাস্থ্য পরীক্ষা এবং পযেবক্ষণ',
		},
		{
			icon: FaPills,
			title: 'ওষুধ সবা',
			description: 'সঠিক সমেয় ওষুধ প্রেয়াগ িনি তকরণ',
		},
		{
			icon: FaUserMd,
			title: 'িবেশষজ্ঞ পরামশ',
			description: 'প্রেয়াজন অনুযায়ী িবেশষজ্ঞ ডাক্তােরর পরামশ',
		},
		{
			icon: FaPhone,
			title: 'সবসময় যাগােযাগ',
			description: 'যেকােনা সমস্যায় সবদা যাগােযাগেযাগ্য',
		},
	];

	return (
		<div className='bg-base-300 pb-12'>
			{/* Hero Banner */}
			<div
				className='hero h-70'
				style={{
					backgroundImage: `url(${banner})`,
				}}
			>
				<div className='hero-overlay bg-opacity-60'></div>
				<div className='hero-content text-neutral-content text-center'>
					<div className='max-w-md'>
						<h1 className='mb-5 text-4xl font-bold'>নািসং কয়ার সবা</h1>
						<p className='mb-5 text-md'>পশাদার নািসং সবা আপনার দারেগাড়ায়</p>
						<button className='btn btn-success'>আরও জানুন</button>
					</div>
				</div>
			</div>

			{/* Services Section */}
			<div className='py-12'>
				<div className='max-w-6xl mx-auto px-4'>
					<h2 className='text-2xl font-bold mb-3'>আমােদর সবাসমূহ</h2>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{services.map((service, index) => (
							<div
								key={index}
								className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-b border-t border-teal-500'
							>
								<div className='text-4xl mb-4 text-teal-600'>
									<service.icon />
								</div>

								<h3 className='text-lg font-bold mb-2'>{service.title}</h3>
								<p className='text-gray-600 text-sm'>{service.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Pricing Section */}
			<div className='bg-base-200 py-12'>
				<div className='max-w-6xl mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-3'>মূল্য তািলকা</h2>
					<p className='text-center text-gray-600 mb-12'>
						আমােদর িবিভন্ন প্যােকজ থেক আপনার পছে র সবা বেছ িনন
					</p>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{pricingPlans.map((plan, index) => (
							<div
								key={index}
								className={`rounded-lg p-8 hover:scale-105 transition ${
									plan.highlight
										? 'bg-teal-50 border-2 border-teal-500 shadow-lg transform md:scale-105 '
										: 'bg-white border border-gray-200 shadow'
								}`}
							>
								<h3 className='text-xl font-bold mb-3'>{plan.name}</h3>
								<div className='mb-6'>
									<span className='text-3xl font-bold text-teal-600'>{plan.price}</span>
									<p className='text-gray-600 text-sm'>{plan.period}</p>
								</div>

								<ul className='space-y-3 mb-8'>
									{plan.features.map((feature, fIndex) => (
										<li key={fIndex} className='flex items-start'>
											<span className='text-teal-500 font-bold mr-2'>✓</span>
											<span className='text-gray-700'>{feature}</span>
										</li>
									))}
								</ul>

								<button
									className={`w-full py-3 rounded-lg font-bold transition ${
										plan.highlight
											? 'bg-teal-500 text-white hover:bg-teal-600'
											: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
									}`}
								>
									িনবাচন করুন
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Benefits Section */}
			<div className='bg-base-200 py-12'>
				<div className='max-w-6xl mx-auto px-4'>
					<h2 className='text-2xl font-bold mb-3'>কন আমােদর বেছ নেবন</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{benefits.map((benefit, index) => (
							<div
								key={index}
								className='flex gap-6 items-start bg-base-100 py-4 pl-4 rounded-xl shadow-md hover:scale-[1.01] transition-all'
							>
								<div className='text-4xl shrink-0 text-teal-600'>
									<benefit.icon />
								</div>
								<div>
									<h3 className='text-lg font-bold mb-2'>{benefit.title}</h3>
									<p className='text-gray-600'>{benefit.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-teal-600 text-white py-12 max-w-6xl mx-auto rounded-2xl '>
				<div className='text-center'>
					<h2 className='text-2xl font-bold mb-3'>আজই আমােদর সবা িনন</h2>
					<p className='text-md mb-8'>আজই যাগােযাগ করুন এবং সরা িচিকৎসা সবার অিভজ্ঞতা িনন</p>
					<div className='flex flex-col items-center md:flex-row gap-4 justify-center'>
						<input
							type='email'
							placeholder='আপনার ইেমইল িলখুন'
							className='flex-1 bg-base-100 max-w-xs px-4 py-3 rounded-lg text-gray-800'
						/>
						<button className='btn btn-neutral rounded-lg font-bold hover:btn-success transition'>
							িনবন্ধন করুন
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NursingCare;
