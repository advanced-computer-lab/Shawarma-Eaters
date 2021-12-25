// import Itinerary, {
//     ItinerarySegment,
//     ItineraryStatus,
//     ItineraryBadgeList,
//     ItinerarySegmentStop,
//     ItinerarySegmentDetail,
//   } from "@kiwicom/orbit-components/lib/Itinerary";

//   class Iten extends React.Component {
//     constructor(props) {
//      super(props);

//      // Set the intiial input values
//      this.state = {
//         depFlight:{},
//         dep_flights: [],
//         ret_flights: [],
//          retFlight:{},


//      }
//    }   componentDidMount(props) { 

//     // this.State{
//     // depSearch: this.props.location.state.depSearch ,
//     // retSearch: this.props.location.state.retSearch,
//     // depFlight : this.props.location.state.depFlight,
//     // retFlight : this.props.location.state.retFlight
//     //   }
//  }


//            render() {
//        return (<Itinerary>
//        <ItinerarySegment spaceAfter="large">
//          <ItinerarySegmentStop
//            city="Moscow"
//            station="Sheremetyevo International Airport (SVO)"
//            date="Fri, 19.10"
//            time="14:05"
//          />
//          <ItinerarySegmentDetail duration="2h 30m" summary={<BadgeGroup />}>
//            <CollapsedContent />
//          </ItinerarySegmentDetail>
//          <ItinerarySegmentStop
//            city="Prague"
//            station="Václav Havel Airport Prague (PRG)"
//            date= "34"
//            time="16:35"
//          />
//        </ItinerarySegment>
//      </Itinerary>);
//      }
//    } 

//    export default Iten;