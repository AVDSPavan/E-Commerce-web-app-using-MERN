import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
//import { isAutheticated } from "../auth/helper";
import { getCategories } from "./helper/adminapicall";
import { API } from "../backend";
const ManageCategories = () => {
	const [categories, setCategories] = useState([]);
	const [reload,setReload] = useState(false)
	//const { user, token } = isAutheticated();

	const preload = () => {
		getCategories().then((data) => {
			if (data.error) {
				console.log("Error:",data.error);
			} else {
				setCategories(data);
			}
		});
	};

	const deleteCategory = (categoryId) =>{
		return fetch(`${API}/category/${categoryId}/`,{
			method:"DELETE"
		}).then(res => {
			setReload(!reload)
		}).catch(err =>{
			console.log(err)
		})
	}

	useEffect(() => {
		preload();
	}, [reload]);

	return (
		<Base title="Welcome admin" description="Manage categories here">
			<div className="container-fluid">
			<Link className="btn btn-info" to={`/admin/dashboard`}>
				<span >Admin Home</span>
			</Link>
			<br/>
			<br/>
			<br/>
			<div className="container">
			<div className="row">
				<div className="col-12">
					{categories.map((category, index) => {
						return (
							<div className="row text-center mb-2 "  key={index}>
							<div className="col-6">
								<h3 className="text-white text-left">{category.name}</h3>
							</div>
							<div className="col-6">
								<button onClick={() => {deleteCategory(category._id)}} className="btn btn-danger">
									Delete
								</button>
							</div>
						</div>
						);
					})}
					
				</div>
			</div>
			</div>
			</div>
		</Base>
	);
};

export default ManageCategories;
