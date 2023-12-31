import { Autocomplete, Box, Slider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { VehicleModel } from "../../../../../Models/VehicleModel";
import vehicleServices from "../../../../../Services/VehicleServices";
import appConfig from "../../../../../Utils/AppConfig";
import "./CategoryPage.css";
import FleetItem from "./Item/Item";

export class searchValues {
    name: string;
    make: string;
    model: string;
    seats: string;
    minP: string;
    maxP: string;
    constructor(name: string, make: string, model: string, seats: string, minP: string, maxP: string) {
        this.name = name;
        this.make = make;
        this.model = model;
        this.seats = seats;
        this.minP = minP;
        this.maxP = maxP;
    }
}
function CategoryPage(): JSX.Element {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams({ s: "", name: "", make: "", model: "", seats: "", minP: "", maxP: "" });
    const [searchValuesForm, setSearchValuesForm] = useState<searchValues>(new searchValues("", "", "", "", "", ""));
    let order: string = searchParams.get("s");
    let name: string = searchParams.get("name");
    let make: string = searchParams.get("make");
    let model: string = searchParams.get("model");
    let seats: string = searchParams.get("seats");
    let minP: string = searchParams.get("minP");
    let maxP: string = searchParams.get("maxP");
    const [resetButtonState, setResetButtonState] = useState<boolean>();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [feVehicles, setFeVehicles] = useState<VehicleModel[]>();
    const [feVehicleNames, setFeVehicleNames] = useState<string[]>([]);
    const [feVehicleMakes, setFeVehicleMakes] = useState<string[]>([]);
    const [feVehicleModels, setFeVehicleModels] = useState<string[]>([]);
    const [feVehicleSeats, setFeVehicleSeats] = useState<string[]>([]);
    const [feVehicleMinMaxPrices, setFeVehicleMinMaxPrices] = useState<number[]>();
    const [priceRange, setPriceRange] = React.useState<number[]>([0, 0]);
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    function changeURL(): void { order === "lth" ? changeParams("htl") : changeParams("lth"); }
    function changeParams(order: string): void {
        setSearchParams(prev => {
            prev.set("s", order);
            return prev;
        });
    }
    function changeSearchParams(): void {
        setSearchParams(prev => {
            prev.set("s", order);
            prev.set("name", searchValuesForm.name);
            prev.set("make", searchValuesForm.make);
            prev.set("model", searchValuesForm.model);
            prev.set("seats", searchValuesForm.seats.toString());
            prev.set("minP", priceRange[0].toString());
            prev.set("maxP", priceRange[1].toString());
            return prev;
        });
    }
    function clearAllParams(): void {
        searchParams.delete("s");
        searchParams.append("s", "");
        searchParams.delete("name");
        searchParams.append("name", "");
        searchParams.delete("make");
        searchParams.append("make", "");
        searchParams.delete("model");
        searchParams.append("model", "");
        searchParams.delete("seats");
        searchParams.append("seats", "");
        searchParams.delete("minP");
        searchParams.append("minP", "");
        searchParams.delete("maxP");
        searchParams.append("maxP", "");
        setSearchParams(searchParams);
    }
    function sortByParams(arr: VehicleModel[]): VehicleModel[] {
        let clone: VehicleModel[] = arr;
        if (name) { clone = clone.filter(v => v.full_name === name); }
        if (make) { clone = clone.filter(v => v.make === make); }
        if (model) { clone = clone.filter(v => v.model === model); }
        if (seats) { clone = clone.filter(v => v.seats.toString() === seats) };
        if (minP) { clone = clone.filter(v => v.price >= +minP) }
        if (maxP) { clone = clone.filter(v => v.price <= +maxP) }
        if (clone.length == 0 && arr.length != 0) { return [] }
        return clone;
    }
    function resetParams(): void {
        searchParams.delete("s");
        searchParams.append("s", "");
        setSearchParams(searchParams);
    }
    function sortByPrice(v: VehicleModel[]): VehicleModel[] {
        const clone: VehicleModel[] = Object.assign([], v);
        if (order == "lth") { clone.sort((v1, v2) => v1.price > v2.price ? 1 : -1) }
        else if (order === "htl") { clone.sort((v1, v2) => v1.price > v2.price ? -1 : 1) };
        return clone;
    }
    function setValuesForAutoCompletes(arr: VehicleModel[]): void {
        let namesHelpSet: Set<string> = new Set();
        let makesHelpSet: Set<string> = new Set();
        let modelsHelpSet: Set<string> = new Set();
        let seatsHelpSet: Set<string> = new Set();
        arr?.forEach(v => namesHelpSet.add(v.full_name));
        setFeVehicleNames(Array.from(namesHelpSet));

        arr?.forEach(v => makesHelpSet.add(v.make));
        setFeVehicleMakes(Array.from(makesHelpSet));

        arr?.forEach(v => modelsHelpSet.add(v.model));
        setFeVehicleModels(Array.from(modelsHelpSet));

        arr?.forEach(v => seatsHelpSet.add(v.seats.toString()));
        setFeVehicleSeats(Array.from(seatsHelpSet).sort((s1: string, s2: string) => +s1 > +s2 ? 1 : -1));
    }
    function getVehiclesByCategory(cat: string, arr: VehicleModel[]): VehicleModel[] {
        let clone: VehicleModel[] = [...arr];
        switch (cat) {
            case "small":
                clone = clone.filter(v => v.id >= 100 && v.id <= 199);
                break;
            case "medium":
                clone = clone.filter(v => v.id >= 200 && v.id <= 299);
                break;
            case "large":
                clone = clone.filter(v => v.id >= 300 && v.id <= 399);
                break;
            case "motorcycles&scooters":
                clone = clone.filter(v => v.id >= 400 && v.id <= 499);
                break;
            case "luxury":
                clone = clone.filter(v => v.id >= 500 && v.id <= 599);
                break;
            case "suv&offraod":
                clone = clone.filter(v => v.id >= 600 && v.id <= 699);
                break;
            case "vans&trucks":
                clone = clone.filter(v => v.id >= 700 && v.id <= 799);
                break;
            case "all":
                clone = clone;
                break;
        }
        return clone;
    }
    function findSetFeVehiclesMinMaxPrices(vehicles: VehicleModel[]): void {
        const arr: VehicleModel[] = [...vehicles];
        let minMaxPrices: number[] = [arr[0].price, arr[0].price];
        arr.forEach(v => {
            if (v.price < minMaxPrices[0]) {
                let x: number[] = [...minMaxPrices];
                x[0] = v.price;
                minMaxPrices = x;
            }
            else if (v.price > minMaxPrices[1]) {
                let x: number[] = [...minMaxPrices];
                x[1] = v.price;
                minMaxPrices = x;
            }
        });
        if (minP || maxP) {
            setPriceRange([+minP, +maxP]);
        }
        else {
            setPriceRange(minMaxPrices);
        }
        setFeVehicleMinMaxPrices(minMaxPrices);
    }

    useEffect(() => {
        vehicleServices.GetAllVehicles()
            .then((allBeVehicles: VehicleModel[]) => {
                let arr: VehicleModel[] = [...allBeVehicles];
                arr = getVehiclesByCategory(params.vehicleCategory, arr);
                if (arr.length != 0) { findSetFeVehiclesMinMaxPrices(arr) }
                arr = sortByPrice(arr);
                arr = sortByParams(arr);
                setValuesForAutoCompletes(arr);
                setFeVehicles(arr);
            })
            .catch(err => { console.log(err) });
    }, [params]);

    return (
        <div className="CategoryPage">
            <h1>Browse {params.vehicleCategory}</h1>
            <h3><div>Or go <NavLink to={appConfig.fleetPagePath}>Back To All Categories</NavLink></div>
                {feVehicles && <span>Showing {feVehicles.length} results</span>}
            </h3>

            {(feVehicles && feVehicles.length == 0) ? <></> :
                <div className={isExpanded ? " filter-container filter-container-expanded" : "filter-container"}>
                    <div className='headers-container'>
                        <h2 onClick={() => setIsExpanded(!isExpanded)}>Filter</h2>
                        <h2 onClick={() => { clearAllParams(); setResetButtonState(!resetButtonState) }}>Reset</h2>
                    </div>
                    <form>
                        <div className='firstDiv' key={resetButtonState ? "yes" : "no"}>
                            <Autocomplete
                                onChange={(event, value) => {
                                    console.log(value);
                                    const newSVals: searchValues = { ...searchValuesForm }
                                    if (value == null) { newSVals.name = ""; }
                                    else { newSVals.name = value; }
                                    setSearchValuesForm(newSVals);
                                }}
                                disablePortal
                                id="full-name-combo-box"
                                options={feVehicleNames}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Vehicle Name" />} />
                            <Autocomplete
                                onChange={(event, value) => {
                                    const newSVals: searchValues = { ...searchValuesForm }
                                    if (value == null) { newSVals.make = ""; }
                                    else { newSVals.make = value; }
                                    setSearchValuesForm(newSVals)
                                }}
                                disablePortal
                                id="make-combo-box"
                                options={feVehicleMakes}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Vehicle Make" />} />
                            <Autocomplete
                                onChange={(event, value) => {
                                    const newSVals: searchValues = { ...searchValuesForm }
                                    if (value == null) { newSVals.model = ""; }
                                    else { newSVals.model = value; }
                                    setSearchValuesForm(newSVals)
                                }}
                                disablePortal
                                id="model-combo-box"
                                options={feVehicleModels}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Vehicle Model" />} />
                            <Autocomplete
                                onChange={(event, value) => {
                                    const newSVals: searchValues = { ...searchValuesForm }
                                    if (value == null) { newSVals.seats = ""; }
                                    else { newSVals.seats = value.toString(); }
                                    setSearchValuesForm(newSVals)
                                }}
                                disablePortal
                                id="seats-combo-box"
                                options={feVehicleSeats}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Number Of Seats" />} />
                        </div>
                        <div className='secondDiv'>
                            {feVehicleMinMaxPrices &&
                                <div className='price-range-div'>
                                    <p>Price <span>(NIS&#8362;/Day)</span></p>
                                    <Box sx={{ width: 300 }}>
                                        <Slider
                                            min={feVehicleMinMaxPrices[0]}
                                            max={feVehicleMinMaxPrices[1]}
                                            getAriaLabel={() => 'Temperature range'}
                                            value={priceRange}
                                            onChange={handleSliderChange}
                                            valueLabelDisplay="auto"
                                        // getAriaValueText={valuetext}
                                        />
                                    </Box>
                                </div>
                            }
                            <button id="searchCarBtn" type='button' onClick={changeSearchParams}>Find My Rental!</button>
                            <div style={{ width: 300 }}></div>
                        </div>
                        <div className='thirdDiv'>
                            {/* <button id="searchCarBtn" type='button' onClick={changeSearchParams}>Find My Rental!</button> */}
                        </div>
                    </form>
                </div>}

            {(feVehicles && feVehicles.length == 0) ?
                <></> :
                <h5> Sort by &nbsp;
                    <a onClick={changeURL}>
                        Price {order === "" ? "" : (order === "lth" ? "Low To High " : "High To Low ")}&nbsp;
                    </a>
                    <a onClick={resetParams}>Most Popular</a>
                </h5>}

            {feVehicles ? (feVehicles.length == 0 && <h3 className="workInProgress">We're working on it!<br />
                {params.vehicleCategory} vehicles will be available soon...</h3>) : ""}

            {feVehicles ? "" : <div className="spinner-container"><BeatLoader color="#A73121" loading size={25} /></div>}

            <div className="CategoryPageGridContainer">
                {feVehicles?.map(v => <div>
                    <FleetItem key={v.id}
                        id={v.id}
                        abs={v.abs}
                        cbs={v.cbs}
                        fuel={v.fuel}
                        type={v.type}
                        make={v.make}
                        price={v.price}
                        doors={v.doors}
                        turbo={v.turbo}
                        model={v.model}
                        seats={v.seats}
                        radio={v.radio}
                        weight={v.weight}
                        license={v.license}
                        luggage={v.luggage}
                        make_year={v.make_year}
                        full_name={v.full_name}
                        image_name={v.image_name}
                        engine_size={v.engine_size}
                        horse_power={v.horse_power}
                        transmission={v.transmission}
                        redirect_path={v.redirect_path}
                        tank_capacity={v.tank_capacity}
                        trunk_capacity={v.trunk_capacity}
                        air_conditioner={v.air_conditioner}
                        luggage_available={v.luggage_available}
                        engine_configuration={v.engine_configuration} />
                </div>)}
            </div>
        </div >
    );
}

export default CategoryPage;
