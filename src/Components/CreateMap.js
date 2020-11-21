import React from "react";
import { VectorMap } from "react-jvectormap";

class CreateMap extends React.Component {
  render() {
    return (
      <div className="map-wrapper">
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent"
          zoomOnScroll={true}
          containerStyle={{
            width: "95%",
            margin: "0 auto",
            height: "80vh",
            border: "5px solid #131318",
          }}
          onRegionTipShow={this.props.regionTipShow}
          onRegionClick={this.props.handleClick}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#222230",
              "fill-opacity": 1,
            },
            hover: {
              "fill-opacity": 0.7,
              cursor: "cursor",
            },
          }}
        />
      </div>
    );
  }
}

export default CreateMap;
