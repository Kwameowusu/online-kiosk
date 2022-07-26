import React, { useContext } from "react";
import { MyContext } from "../../contextapi/MyProvider";
import { ISearch } from "./icons/Icons";

const Search = ({ setdsearch, top }) => {
	const {setsearch}= useContext(MyContext)
	return (
		<>
			<form
				style={{ top: top }}
				// onSubmit={searchItem}
				className="form-search-items-wrapper">
				<div className="search-items-container">
					<div>
						
					<span className="search-items-icon">
						<ISearch iwidth='20' iheight='20'  />
					</span>
						
						<input
							required
							type="search"
							name=""
							id=""
							placeholder="search"
							onChange={(e) =>
							    setsearch(e.target.value)
							}
						/>
						<span className="homepage-search-button">
							<span onClick={() => setdsearch(false)}>close</span>
						</span>
					</div>
				</div>
			</form>
		</>
	);
};

export default Search;
