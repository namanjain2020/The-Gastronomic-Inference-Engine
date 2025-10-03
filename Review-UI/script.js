import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";

let client = null;

async function getClient() {
    if (!client) {
        client = await Client.connect("aatifahmad-jodhpur/restaurant_reviews");
    }
    return client;
}


const indianDishes = [
    { name: "Butter Chicken", category: "North Indian" },
    { name: "Paneer Tikka", category: "North Indian" },
    { name: "Palak Paneer", category: "North Indian" },
    { name: "Dal Makhani", category: "North Indian" },
    { name: "Chole Bhature", category: "North Indian" },
    { name: "Aloo Paratha", category: "North Indian" },
    { name: "Tandoori Chicken", category: "North Indian" },
    { name: "Naan", category: "North Indian" },
    { name: "Rogan Josh", category: "North Indian" },
    { name: "Kadhai Paneer", category: "North Indian" },
    { name: "Malai Kofta", category: "North Indian" },
    { name: "Rajma", category: "North Indian" },
    { name: "Sarson ka Saag", category: "North Indian" },
    { name: "Amritsari Kulcha", category: "North Indian" },
    { name: "Chicken Tikka", category: "North Indian" },
    { name: "Masala Dosa", category: "South Indian" },
    { name: "Idli", category: "South Indian" },
    { name: "Sambhar", category: "South Indian" },
    { name: "Vada", category: "South Indian" },
    { name: "Uttapam", category: "South Indian" },
    { name: "Rasam", category: "South Indian" },
    { name: "Pongal", category: "South Indian" },
    { name: "Bisi Bele Bath", category: "South Indian" },
    { name: "Appam", category: "South Indian" },
    { name: "Chicken Chettinad", category: "South Indian" },
    { name: "Fish Curry", category: "South Indian" },
    { name: "Hyderabadi Biryani", category: "South Indian" },
    { name: "Mysore Pak", category: "South Indian" },
    { name: "Pesarattu", category: "South Indian" },
    { name: "Upma", category: "South Indian" },
    { name: "Pani Puri", category: "Street Food" },
    { name: "Pav Bhaji", category: "Street Food" },
    { name: "Vada Pav", category: "Street Food" },
    { name: "Bhel Puri", category: "Street Food" },
    { name: "Samosa", category: "Street Food" },
    { name: "Dahi Puri", category: "Street Food" },
    { name: "Sev Puri", category: "Street Food" },
    { name: "Papdi Chaat", category: "Street Food" },
    { name: "Aloo Tikki", category: "Street Food" },
    { name: "Kachori", category: "Street Food" },
    { name: "Dabeli", category: "Street Food" },
    { name: "Momos", category: "Street Food" },
    { name: "Jalebi", category: "Street Food" },
    { name: "Pakora", category: "Street Food" },
    { name: "Mirchi Vada", category: "Street Food" },
    { name: "Chicken Biryani", category: "Rice & Biryani" },
    { name: "Mutton Biryani", category: "Rice & Biryani" },
    { name: "Vegetable Biryani", category: "Rice & Biryani" },
    { name: "Jeera Rice", category: "Rice & Biryani" },
    { name: "Pulao", category: "Rice & Biryani" },
    { name: "Lemon Rice", category: "Rice & Biryani" },
    { name: "Curd Rice", category: "Rice & Biryani" },
    { name: "Tamarind Rice", category: "Rice & Biryani" },
    { name: "Kashmiri Pulao", category: "Rice & Biryani" },
    { name: "Dum Biryani", category: "Rice & Biryani" },
    { name: "Roti", category: "Breads" },
    { name: "Chapati", category: "Breads" },
    { name: "Garlic Naan", category: "Breads" },
    { name: "Butter Naan", category: "Breads" },
    { name: "Laccha Paratha", category: "Breads" },
    { name: "Puri", category: "Breads" },
    { name: "Bhatura", category: "Breads" },
    { name: "Tandoori Roti", category: "Breads" },
    { name: "Kulcha", category: "Breads" },
    { name: "Missi Roti", category: "Breads" },
    { name: "Shahi Paneer", category: "Curries" },
    { name: "Paneer Butter Masala", category: "Curries" },
    { name: "Chicken Curry", category: "Curries" },
    { name: "Mutton Curry", category: "Curries" },
    { name: "Korma", category: "Curries" },
    { name: "Vindaloo", category: "Curries" },
    { name: "Aloo Gobi", category: "Curries" },
    { name: "Bhindi Masala", category: "Curries" },
    { name: "Baingan Bharta", category: "Curries" },
    { name: "Mix Veg Curry", category: "Curries" },
    { name: "Gulab Jamun", category: "Desserts" },
    { name: "Rasmalai", category: "Desserts" },
    { name: "Kheer", category: "Desserts" },
    { name: "Gajar Halwa", category: "Desserts" },
    { name: "Kulfi", category: "Desserts" },
    { name: "Rasgulla", category: "Desserts" },
    { name: "Sandesh", category: "Desserts" },
    { name: "Barfi", category: "Desserts" },
    { name: "Ladoo", category: "Desserts" },
    { name: "Halwa", category: "Desserts" },
    { name: "Dhokla", category: "Snacks" },
    { name: "Poha", category: "Snacks" },
    { name: "Cutlet", category: "Snacks" },
    { name: "Spring Roll", category: "Snacks" },
    { name: "Bread Pakora", category: "Snacks" },
    { name: "Paneer Pakora", category: "Snacks" },
    { name: "Namkeen", category: "Snacks" },
    { name: "Mathri", category: "Snacks" },
    { name: "Chakli", category: "Snacks" },
    { name: "Murukku", category: "Snacks" }
];

let selectedDishes = new Set();
let reviewTexts = {};

function getDishImagePath(dishName) {
    return `./images/${dishName.toLowerCase().replace(/\s+/g, '_')}.png`;
}

function setDishesCount(){
    document.querySelector('#totalDishes').innerHTML = `${indianDishes.length}`
}

function initializeDishes() {
    const grid = document.getElementById('dishesGrid');
    grid.innerHTML = '';

    indianDishes.forEach((dish, index) => {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.innerHTML = `
                    <img src="${getDishImagePath(dish.name)}" alt="${dish.name}" class="dish-image" onerror="this.style.background='#eee'">
                    <div class="dish-name">${dish.name}</div>
                    <div class="dish-category">${dish.category}</div>
                `;
        card.addEventListener('click', () => toggleDish(index, dish));
        grid.appendChild(card);
    });
}

function toggleDish(index, dish) {
    const cards = document.querySelectorAll('.dish-card');

    if (selectedDishes.has(index)) {
        selectedDishes.delete(index);
        delete reviewTexts[index];
        cards[index].classList.remove('selected');
    } else {
        selectedDishes.add(index);
        cards[index].classList.add('selected');
    }

    updateReviewSection();
    updateStats();
}

function updateReviewSection() {
    const container = document.getElementById('reviewContainer');

    if (selectedDishes.size === 0) {
        container.innerHTML = '<div class="empty-state">Select dishes from above to start reviewing</div>';
        return;
    }

    container.innerHTML = '';
    selectedDishes.forEach(index => {
        const dish = indianDishes[index];
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
                    <div class="dish-label">${dish.name}</div>
                    <textarea 
                        class="review-textarea" 
                        placeholder="Write your review for ${dish.name}..."
                        data-dish-index="${index}"
                    >${reviewTexts[index] || ''}</textarea>
                `;
        container.appendChild(reviewItem);

        const textarea = reviewItem.querySelector('textarea');
        textarea.addEventListener('input', (e) => {
            reviewTexts[index] = e.target.value;
        });
    });
}

function updateStats() {
    document.getElementById('selectedCount').textContent = selectedDishes.size;
}

document.getElementById('searchBox').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.dish-card');

    cards.forEach((card, index) => {
        const dish = indianDishes[index];
        const matches = dish.name.toLowerCase().includes(search) ||
            dish.category.toLowerCase().includes(search);
        card.style.display = matches ? 'block' : 'none';
    });
});

async function submitReviews() {
    const messageDiv = document.getElementById('message');

    if (selectedDishes.size === 0) {
        showMessage('Please select at least one dish', 'error');
        return;
    }

    const reviews = [];
    let hasEmptyReview = false;

    selectedDishes.forEach(index => {
        const reviewText = reviewTexts[index] || '';
        if (!reviewText.trim()) {
            hasEmptyReview = true;
            return;
        }

        reviews.push({
            dish: indianDishes[index].name,
            category: indianDishes[index].category,
            review: reviewText.trim(),
            timestamp: new Date().toISOString()
        });
    });

    if (hasEmptyReview) {
        showMessage('Please provide reviews for all selected dishes', 'error');
        return;
    }

    console.log('Submitting reviews:', reviews);
    
    // Show analyzing message
    showMessage('Analyzing reviews...', 'info');

    try {

        const gradioClient = await getClient(); // Get client here instead

        // Get predictions for all reviews
        const predictionsPromises = reviews.map(review => 
            gradioClient.predict("/predict", { review: review.review })
        );
        
        const predictions = await Promise.all(predictionsPromises);

        console.log('Predictions:', predictions);

        // Prepare data for SheetDB
        const sheetData = reviews.map((review, idx) => {
            // Access the prediction data correctly
            const predictionData = predictions[idx].data[0];
            const predictedLabel = predictionData['Predicted Label'];
            
            return {
                'Dish Name': review.dish,
                'Review': review.review,
                'Label': predictedLabel.charAt(0).toUpperCase() + predictedLabel.slice(1) // Capitalize first letter
            };
        });

        console.log('Sheet data:', sheetData);

        // Send to SheetDB
        const response = await fetch('https://sheetdb.io/api/v1/ld6voxw8a2p1d', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: sheetData
            })
        });

        const data = await response.json();
        console.log('SheetDB response:', data);
        showMessage(`Successfully submitted ${reviews.length} review(s)!`, 'success');

        setTimeout(() => {
            reviewTexts = {};
            selectedDishes.clear();
            document.querySelectorAll('.dish-card').forEach(c => c.classList.remove('selected'));
            updateReviewSection();
            updateStats();
            messageDiv.style.display = 'none';
        }, 2000);

    } catch (error) {
        console.error('Error:', error);
        showMessage('Failed to process reviews. Please try again.', 'error');
    }
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    setDishesCount();
    initializeDishes();
    document.getElementById('submitBtn').addEventListener('click', submitReviews);
});
