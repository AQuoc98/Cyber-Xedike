import React from 'react';
import "./main-banner.css";
import SearchTripForm from "./search-trip-form/search-trip-from";

export default function MainBanner() {
  return (
    <section className="main-banner">
        <div className="container">
            <div className="row-md5">
            <SearchTripForm className="mt-5"/>
            </div>
        </div>
    </section>

  )
}
