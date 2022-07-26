import React, { useContext } from "react";
import { MyContext } from "../../../contextapi/MyProvider";
import { EditItem, Trash } from "../../common/icons/Icons";
const Catalog = ({ seteditclose, setdeleteclose, PopDelete,PopEdit }) => {
	const { search, products } = useContext(MyContext);
	return (
		<>
			{[...new Map(products.map((item) => [item.id, item])).values()]
				.filter((post) => {
					if (search === "" || search === undefined) return post;
					else if (
						post.name
							.toString()
							.toLowerCase()
							.includes(search.toString().toLowerCase())
					)
						return post;
					return "";
				})
				.map((pro) => (
					<div
						key={pro.id}
						className="displayproduct-each-product-wrapper">
						<div
							className="displayproduct-each-product-image"
							style={{
								backgroundColor: `${pro.productsImages.image1.color}`, overflow:"hidden"
							}}
						>
							<img
								onError={(e) => e.target.style.display='none' }
								src={pro.productsImages.image1.url} alt="" />
						</div>
						<div className="displayproduct-each-product-name-wrapper">
							<p>{pro.name}</p>
						</div>
						<span>
							<p
								className="p1"
								onClick={() => {
									PopEdit(pro)
									seteditclose(true);
								}}>
								<EditItem
									iwidth='20'
									iheight='20'
								/>
							</p>
							<p
								className="p2"
								
								onClick={() => {
									PopDelete(
										pro.id,
										pro.productsImages,
										pro.productBanner
									);
									setdeleteclose(true);
								}}>
								<Trash iwidth="20" iheight="20"/>
							</p>
						</span>
					</div>
				))}
		</>
	);
};

export default React.memo(Catalog);
