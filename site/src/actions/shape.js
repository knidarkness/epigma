import uuid4 from "uuid/v4";
import {DOCUMENT_LIST_URI} from "../const";
import * as actionTypes from "./actionTypes";

export const fetchShapes = (id) => {
    return (dispatch) => {
        fetch(DOCUMENT_LIST_URI + '/' + id + '/shapes/')
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                dispatch({
                    type: actionTypes.FETCH_SHAPES,
                    shapes: data.shapes
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};
