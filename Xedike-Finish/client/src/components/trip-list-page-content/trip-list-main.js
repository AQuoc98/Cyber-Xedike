import React from 'react';
import TripList from "./trips-list/trips-list";
import SidebarFilter from "./sidebar-filter/sidebar-filter";


export default function TripListPageMain(props) {
  return (
    <section className="main">
      <div className="container">
        <div className="row py-5 trip-list-main">
          <div className="col-sm-3 col-12 mb-5">
            <SidebarFilter />
          </div>
          <div className="col-sm-9 col-12">
            <TripList tripList={props.tripList} />
          </div>
        </div>
      </div>
    </section>
  )
}