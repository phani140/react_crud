
import { useState } from "react";
import axios from 'axios';
 
function CrudOperations() 
{ 
    
    const [productsArray, setproductsArray ] = useState([]);  
    
    // For reading data from user through textboxes.
    const [id, setId] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");        //useState is used to save data from form.
    const [unitPrice, setUnitPrice] = useState("");
    const [productImage, setProductImage] = useState("");


    function getProductsClick()
    {     
        let url = "http://localhost:3500/products";  
        axios.get(url).then( (resData) => 
        {
            setproductsArray(resData.data);
        });       
    }

    function addProductClick()
    {
        let proObj = {};
        proObj.id = id;
        proObj.productName = productName;
        proObj.category = category;
        proObj.unitPrice = unitPrice;
        proObj.productImage = productImage;

        let url= "http://localhost:3500/products";
        axios.post(url,  proObj ).then( (resData) => 
        { 
			 // logic 
             alert("New Product details are inserted in server");
             getProductsClick();
        });

        clearFields();
    }


    function deleteProductClick(id)
    { 
        let flag =  window.confirm("Do you want to delete?");

        if(flag == false)
        {
            return;
        }

        let url= "http://localhost:3500/products/" + id;
        axios.delete(url).then( (resData) => 
        {	              
              alert("Product details are deleted from server");
              getProductsClick();
        });
    }

    function selectProductClick(id)
    { 
        let url= "http://localhost:3500/products/" + id;
        axios.get(url).then( (resData) => 
        {   
            let proObj =  resData.data;
           
            setId(proObj.id);
            setProductName(proObj.productName);
            setCategory(proObj.category);              
            setUnitPrice(proObj.unitPrice);              
            setProductImage(proObj.productImage);              
              
        });
        
         
    }


    function updateProductClick()
    {
        let proObj = {};
        proObj.id = id;
        proObj.productName = productName;
        proObj.category = category;
        proObj.unitPrice = unitPrice;
        proObj.productImage = productImage;


        let url= "http://localhost:3500/products/" + proObj.id;
        axios.put(url,  proObj ).then( (resData) => 
        { 
			 alert("Product details are updated in server");
             getProductsClick();
        });

        clearFields();
    }



    function clearFields()
    {
        setId("");
        setProductName("");
        setCategory("");
        setUnitPrice("");
        setProductImage("");
    }


 
    let resultArray = productsArray.map((item, index) =>  
        <tr key={index}>
            <td>   {item.id}  </td>
            <td>   {item.productName}  </td>
            <td>   {item.category}  </td> 
            <td>   {item.unitPrice}  </td> 
            <td>   {<img src={item.productImage} alt="Product Image" width="100" length="100" />}  </td> 
            <td>
                    <a  href="#" onClick={() => selectProductClick(item.id) }>Select</a>|
                    <a  href="#" onClick={() => deleteProductClick(item.id) }>Delete</a>
            </td>
        </tr>
     );

    return (
        <> 
            <h3>CRUD Operations using JSON Server</h3>
            <hr />

            <input  type="text" value={id}  onChange={ (e) => setId(e.target.value) } placeholder="enter id" /> <br/>
            <input  type="text" value={productName} onChange={ (e) => setProductName(e.target.value) }  placeholder="enter Name"/> <br/>
            <input  type="text" value={category}  onChange={ (e) => setCategory(e.target.value) }  placeholder="enter category"/> <br/>
            <input  type="text" value={unitPrice}  onChange={ (e) => setUnitPrice(e.target.value) } placeholder="enter UnitPrice" /> <br/>
            <input  type="text" value={productImage}  onChange={ (e) => setProductImage(e.target.value) } placeholder="Insert link" />
            <hr/>
 
            <input type="button" value="Get Product" onClick={getProductsClick} />
            <input type="button" value="Add Product" onClick={addProductClick} />
            <input type="button" value="Update Product" onClick={updateProductClick} />
            <hr/>

           
            <table align="center" border="2" width="100%" cellspacing="0" cellpadding="5">
                <tr>
                    <th>id</th>
                    <th>productName</th>
                    <th>category</th>
                    <th>unitPrice</th>
                    <th>productImage</th>
                    <th></th>
                </tr>
                {resultArray}
            </table>
            
            
        </>
    );
}

export default CrudOperations;