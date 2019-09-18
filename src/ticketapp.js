import eventlist from './eventlist'
import EventItem from './eventitem'

class TicketApp {

    createEventList() {
        let list = document.getElementById('list');
        let events = this.eventlist.Items.map(item => {
            let event = new EventItem(item.Day, item.Date, item.Time, item.EventName, item.VenueName, item.VenueCity, item.MinPrice, item.IsSellingFast, item.IsSoldOut);
            list.appendChild(event.listing);
            return event;
        });
        return events
    };
    
    // part 2
    createLocationFilter() {   
        let locationFilter = document.getElementById('location-filter');
        let uniqueLocations = new Set()
        locationFilter.addEventListener('change', e => this.filterLocation(e.target.value));
        for (let item of this.eventlist.Items) {
            let loc = document.createElement('option');
            loc.value = item.VenueCity;
            loc.innerHTML = item.VenueCity;
            if (!uniqueLocations.has(item.VenueCity)) {
                uniqueLocations.add(item.VenueCity);
                locationFilter.appendChild(loc);
            }
        }
    }

    filterLocation(location) {
        this.resetFilter();
        if (location) {
            this.events.forEach(event => {
                if (event.city !== location) {
                    debugger
                    event.listing.style.display = "none";
                };
            });
        };
    };

    resetFilter() {
        this.events.forEach(event => {
            event.listing.style.display = "flex";
        });
    };

    startApp() {
        this.eventlist = _eventlist__WEBPACK_IMPORTED_MODULE_0__.default;
        this.events = this.createEventList();
        this.createLocationFilter();
    }

};

var application = new TicketApp();
document.addEventListener('DOMContentLoaded', application.startApp());

