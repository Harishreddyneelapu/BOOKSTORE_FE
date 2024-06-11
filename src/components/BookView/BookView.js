import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookImage from '../../assets/bookimage.png';
import { getBookByIdApiCall } from '../../services/BookService';
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";


import './BookView.css';
import { useNavigate, useParams } from 'react-router-dom';

function BookView() {
    const [bookData, setBookData] = useState({});
    const navigate = useNavigate()

    const BookId = useParams();
    console.log(BookId.bookId);

    const navigateToBooks = () => {
        navigate("/dashboard/allBooks")
    }
    useEffect(() => {
        const getBooks = async () => {
            try {
                let response = await getBookByIdApiCall(BookId.bookId);
                setBookData(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };
        getBooks();
    }, [BookId.bookId]);
    return (
        <div className="container">
            <div className="left-main-book">
                <span className="home-link" onClick={navigateToBooks}>Home /</span>
                <span className="current-page">Book(01)</span>
            </div>

            <div className="book-details">
                <div className="image-section">
                    {/* <div className="thumbnail">
            <img src={BookImage} alt="Book Thumbnail" />
          </div>
          <div className="thumbnail">
            <img src={BookImage} alt="Book Thumbnail" />
          </div> */}
                    <div className="main-image">
                        <img src={BookImage} alt="Book Main" />
                    </div>
                    <div className="actions">
                        <button className="add-to-cart">ADD TO CART</button>
                        <button className="wishlist">
                            <FavoriteIcon className="wishlist-icon" />
                            <span className='wishlist-title-in-button'>WISHLIST</span> 
                        </button>
                    </div>
                </div>
                <div className="info-section">
                    <div className="book-info">
                        <span className="book-title">{bookData.bookName}</span>
                        <span className="book-author">{bookData.author}</span>
                        <div className="rating">
                            <div className="rating-box">
                                <span className="rating-value">4.5</span>
                                <StarIcon className="star-icon" />
                            </div>
                            <span className="quantity">{`(${bookData.quantity})`}</span>
                        </div>
                        <div className="pricing">
                            <span className="discount-price">Rs. {bookData.discountPrice}</span>
                            <span className="original-price">Rs. {bookData.price}</span>
                        </div>
                        <div className="separator" />
                        {/* <ul className="book-details-list">
                            <li>Book Detail</li>
                        </ul> */}
                        <div className='book-details-list'>Book Detail</div>
                        <p className="book-description">
                            Since Don’t Make Me Think was first published in 2000, hundreds of
                            thousands of Web designers and developers have relied on usability
                            guru Steve Krug’s guide to help them understand the principles of
                            intuitive navigation and information design. Witty, commonsensical,
                            and eminently practical, it’s one of the best-loved and most
                            recommended books on the subject. Now Steve returns with fresh
                            perspective to reexamine the principles that made Don’t Make Me
                            Think a classic–with updated examples and a new chapter on mobile
                            usability. And it’s still short, profusely illustrated…and best of
                            all–fun to read. If you’ve read it before, you’ll rediscover what
                            made Don’t Make Me Think so essential to Web designers and
                            developers around the world. If you’ve never read it, you’ll see why
                            so many people have said it should be required reading for anyone
                            working on Web sites.
                        </p>
                        <div className="separator" />
                        <p className="feedback-title">Customer Feedback</p>
                        <div className="feedback-section">
                            <span>Overall rating</span>
                            <div className="stars">
                                <StarBorderIcon className="star-outline" />
                                <StarBorderIcon className="star-outline" />
                                <StarBorderIcon className="star-outline" />
                                <StarBorderIcon className="star-outline" />
                                <StarBorderIcon className="star-outline" />
                            </div>
                            <div className="comment-box">
                                <textarea
                                    type="text"
                                    className="comment-input"
                                    placeholder="Write your review"
                                />
                                <div className="submit-button">
                                    <Button variant="contained" size="small">
                                        Submit
                                    </Button>
                                </div>
                            </div>


                        </div>
                        <div className="review">
                            <div className='reviewer-details'>
                                <div className="reviewer-avatar">HR</div>
                                <div className="reviewer-name">Harish Reddy</div>
                            </div>
                            <div className="review-stars">
                                <StarOutlinedIcon className="star-outline" style={{ color: "gold" }} />
                                <StarOutlinedIcon className="star-outline" style={{ color: "gold" }} />
                                <StarOutlinedIcon className="star-outline" style={{ color: "gold" }} />
                                <StarBorderIcon className="star-outline" />
                                <StarBorderIcon className="star-outline" />
                            </div>
                            <p className="review-text">
                                Good product. Even though the translation could have been
                                better, chankya's neeti are thought provoking.you’ll rediscover what
                                made Don’t Make Me Think so essential to Web designers and
                                developers around the world. If you’ve never read it, you’ll see why
                                so many people have said it should be required reading for anyone
                                working on Web sites.
                            </p>
                        </div>
                        <div className="review">
                            <div className='reviewer-details'>
                                <div className="reviewer-avatar">SB</div>
                                <div className="reviewer-name">Sabari</div>
                            </div>
                            <div className="review-stars">
                                <StarOutlinedIcon className="star-outline" style={{ color: "gold" }} />
                                <StarOutlinedIcon className="star-outline" style={{ color: "gold" }} />
                                <StarOutlinedIcon className="star-outline" style={{ color: "gold" }} />
                                <StarOutlinedIcon className="star-outline" style={{ color: "gold" }} />
                                <StarBorderIcon className="star-outline" />
                            </div>
                            <p className="review-text">
                                Good product. Even though the translation could have been
                                better, chankya's neeti are thought provoking.you’ll rediscover what
                                made Don’t Make Me Think so essential to Web designers and
                                developers around the world. If you’ve never read it, you’ll see why
                                so many people have said it should be required reading for anyone
                                working on Web sites.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookView;
