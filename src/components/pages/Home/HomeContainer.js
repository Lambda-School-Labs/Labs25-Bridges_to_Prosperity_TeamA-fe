import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlyToInterpolator } from 'react-map-gl';
import { getAllBridges, getSingleBridge } from '../../../state/actions';
import { Modal } from 'antd';
import MapMenu from './MapMenu';
import Mapbox from './Mapbox';
import BridgeForms from '../BridgeForms.js';

function HomeContainer() {
  const [visible, setVisible] = useState(false);
  const [bridgesToggle, setBridgesToggle] = useState(false);

  // One spot for default view values, so this object can be shared across components
  const originalView = {
    //this is bridge site 1 coordinates
    latitude: -1.94995,
    longitude: 29.9,
    width: '100vw',
    height: '100vh',
    zoom: 8.4,
  };

  const [viewport, setViewport] = useState(originalView);

  //starting theme of minimo
  //theme to be set with an onclick
  const [theme, setTheme] = useState(
    localStorage.getItem('mapStyle')
      ? localStorage.getItem('mapStyle')
      : 'mapbox://styles/jameslcarpino/ckebr24rw1fs91an1h6e52vij'
  );
  const [toggleMarkerColor, setToggleMarkerColor] = useState(false);

  //function for setting theme of the map
  const changeTheme = style => {
    //grabs the id target
    const changeStyle = style.target.id;
    //sets the theme
    localStorage.setItem(
      'mapStyle',
      `mapbox://styles/jameslcarpino/${changeStyle}`
    );
    setTheme(`mapbox://styles/jameslcarpino/${changeStyle}`);
    setToggleMarkerColor(!toggleMarkerColor);
  };

  const dispatch = useDispatch();

  // Components should be set up to handle errors and loadings status
  // eslint-disable-next-line
  const { bridgeData, loading, error } = useSelector(
    state => state.bridgeSitesReducer
  );
  //handles the click feature of the info
  const clickMarker = bridge => {
    // setVisible(!visible);
    setBridgesToggle(true);
    dispatch(getSingleBridge(bridge));
  };

  //bridge zoom in function
  const ZoomIn = bridge => {
    setViewport({
      latitude: bridge.latitude,
      longitude: bridge.longitude,
      width: '100%',
      height: '100%',
      zoom: 15,
      transitionInterpolator: new FlyToInterpolator({ speed: 3 }),
      transitionDuration: 'auto',
    });
    clickMarker(bridge);
  };

  const toggleBridges = () => {
    setBridgesToggle(!bridgesToggle);
  };

  useEffect(() => {
    // When home page is refreshed all bridges
    // are retrieved
    dispatch(getAllBridges());
  }, [dispatch]);

  /******* FOR ADDING/EDITING FORM *******/
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // TO SHOW OR HIDE MODAL
  const changeShow = () => {
    setShow(!show);
  };

  const cancelModal = () => {
    setShow(!show);
    setIsEditing(false);
  };

  // CHANGE EDITING STATE
  const changeIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const [checked, setChecked] = useState(false);

  const changeChecked = () => {
    setTimeout(() => {
      setChecked(true);
    }, 1200);
  };

  return (
    <div className="home-wrapper">
      {/* HAMBURGER MENU START */}
      <div className="menu-cont">
        <input
          type="checkbox"
          className="toggle"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="hamburger">
          <div></div>
        </div>
        <div className="menu">
          {/* Passing down functions and bridge data to 
      assist sorting through the bridge data */}
          <MapMenu
            toggleBridges={toggleBridges}
            bridgeData={bridgeData}
            bridgesToggle={bridgesToggle}
            visible={visible}
            setViewport={setViewport}
            originalView={originalView}
            setBridgesToggle={setBridgesToggle}
            setTheme={setTheme}
            ZoomIn={ZoomIn}
            changeTheme={changeTheme}
            changeShow={changeShow}
            changeIsEditing={changeIsEditing}
          />
        </div>
      </div>
      <Mapbox
        clickMarker={clickMarker}
        visible={visible}
        setVisible={setVisible}
        viewport={viewport}
        setViewport={setViewport}
        theme={theme}
        setTheme={setTheme}
        ZoomIn={ZoomIn}
        toggleMarkerColor={toggleMarkerColor}
        changeChecked={changeChecked}
      />
      <Modal visible={show} footer={null} onCancel={cancelModal}>
        <BridgeForms
          changeShow={changeShow}
          changeIsEditing={changeIsEditing}
          isEditing={isEditing}
        />
      </Modal>
    </div>
  );
}

export default HomeContainer;
