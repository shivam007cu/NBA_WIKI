import React, { useState } from 'react';
import { Paper, Grid, Typography, Tooltip } from '@material-ui/core';
import FirstList from './FirstList';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";


function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}

function Load() {
    return (
        <Grid team lg={3} md={4} xs={12} style={{ margin: "0 auto", textAlign: "center" }}>
            <Typography style={{ margin:"80px 80px 80px 80px", textAlign: "center" }} variant="h2">
                Loading...
            </Typography>
        </Grid>
    )
}

function formatTime(string){
    return new Date(string).toLocaleTimeString([]);
}

function First() {
    const [data, setData] = useState(["Loading"]);

    let [modalOpen, setModalOpen] = useState(() => {
        let temp = {};
        for (let a=0; a<20; a++)
            temp = {...temp, [a]: false};
        return temp;
    });

    function openModal(e,idx) {
        e.stopPropagation();
        console.log("openModal");
        const temp = {...modalOpen, [idx]: true};
        setModalOpen(temp);
    }
    
    function closeModal(idx) {
        console.log("closeModal");
        const temp = {...modalOpen, [idx]: false};
        setModalOpen(temp);
    }

    if (data[0] == "Loading")
        axios.get("https://www.balldontlie.io/api/v1/games?per_page=20")
            .then(res => setData(res.data.data));
    return (
        <Paper>
            <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={800}>
                {
                    data[0] == "Loading" ? <Load /> :
                        data.map((game, idx) => {
                            return (
                                <Grid team md={4} lg={3} xs={12} key={idx} onClick={(e) => {return openModal(e,idx)}}>
                                    <Typography variant="title">
                                        <h2><b>{formatDate(game.date)}</b></h2>
                                        <Typography variant="subtitle1">
                                            <p>{formatTime(game.date)} ET</p>
                                        </Typography>
                                    </Typography>
                                    <FirstList data={game} open={modalOpen[idx]} close={() => {return closeModal(idx)}}/>
                                </Grid>
                            );
                        })
                }
            </Grid>
        </Paper>
    )
}

export default First;