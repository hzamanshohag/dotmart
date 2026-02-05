# love-and-giftcorner-server

User
Product

cart item {
{
"user": "65f12abc1234def567890111",
"product": "65f45abc1234def567890222",
"quantity": 2
}
}
<!-- /api/v1/users?page=3&limit=15 -->
user model {
name,
email,
phone number,
photo,
password,
order history -> ref [Order],
role -> user, admin
status -> active, inactive
cart -> ref [cart item]
}

order {
{
"user": "65f12abc1234def567890111",
"items": [
{
"product": "65f45abc1234def567890222",
"quantity": 2,
"price": 120
}
],
"totalAmount": 240,
"paymentStatus": "pending",
"orderStatus": "processing"
}

<!-- paymentStatus -> pending, paid, failed  -->
<!-- orderStatus -> processing, shipped, delivered, cancelled -->

}

product {
{
"name": "Wireless Mouse",
"description": "Ergonomic wireless mouse with long battery life",
"category": "65ffabc1234def567890999",
"price": 25,
"originalPrice": 35,
"images": [
"https://example.com/products/mouse1.webp"
],
"stock": true,
"status": "enable",
"meta": {
"title": "Wireless Mouse Online",
"description": "Buy ergonomic wireless mouse at best price",
"keyword": ["mouse", "wireless", "electronics"]
}
}

}
| Query                                 | Works |
| ------------------------------------- | ----- |
| `?category=Electronics`               | ✅     |
| `?category=electronics`               | ✅     |
| `?category=65c1f2a8e9ab...`           | ✅     |
| `?search=iphone&category=Electronics` | ✅     |
<!-- products?category=Electronics&page=1&limit=10&sortOrder=asc -->
<!-- products?page=2&limit=5&sortOrder=desc -->

category {
{
"name": "Electronics"
}

Hero Section{
{
"carouselImages": [
{
"image": "https://example.com/hero/slide1.webp",
"alt": "Big Sale",
"link": "/products/sale"
}
],
"sideImages": [
{
"image": "https://example.com/hero/side1.webp",
"alt": "New Arrival",
"link": "/products/new"
}
]
}
}
}

Trending Offer{
"\_id": "65f27d9c9b123abc456def12",
"title": "Valentine’s Special Offer",
"description": "Flat 30% off on selected gifts",
"image": "https://example.com/offers/valentine.webp",
"ctaLink": "65f27c5a8b123abc456def98",
"priority": 1,
"isActive": true,
"createdAt": "2026-01-11T08:20:00.000Z",
"updatedAt": "2026-01-11T08:20:00.000Z"
}

<!-- reviews?page=2&limit=10 -->
review {
"name": "Md Hasanuzzaman Shohag",
"userImage": "https://example.com/users/shohag.webp",
"social": {
"platform": "twitter", "facebook", "linkedin", "instagram", "Youtube"
},
"rating": 5,
"text": "Excellent service and very professional approach. Everything was delivered on time and exceeded expectations.",
"isApproved": true
}

export const metadata: Metadata = {
title: "product title",
description:
"product description",
keyword:"product keyword"
};
