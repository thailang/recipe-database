import db from "./db.config";
import { useState, useEffect} from "react";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore"

function RecipeApp() {
  const [ recipes, setRecipes] = useState([])
  const [form, setForm ] = useState({
    title: "",
    instructions: [],
    ingredients: []
    
  })
  const [popupAddRecipe, setPopupAddRecipe] = useState(false)
  const [popupUpdateRecipe, setPopupUpdateRecipe] = useState(false)
  const [RecipeID, setRecipeID] = useState("")


  const recipesCollectionRef = collection(db, "recipes/aSiGCtv9zqkXf9uPs64K/Renz@email")

  useEffect(() => {
    onSnapshot(recipesCollectionRef,snapshot => {
      setRecipes(snapshot.docs.map(doc => {
        return{
          id: doc.id,
          viewing: false,
          ...doc.data()
        }
      }))
    })
  }, [])

  const handleView = id =>{
    const recipesClone = [...recipes]
    
    recipesClone.forEach(recipe => {
      if(recipe.id === id){
        recipe.viewing = !recipe.viewing
      }else{
        recipe.viewing = false
      }
    })

    setRecipes(recipesClone)
  }

  const handleSubmit = e =>{
    e.preventDefault()

    if(
      !form.title ||
      !form.instructions ||
      !form.ingredients
    ){
      alert("Please fill out all fields")
      return
    }

    addDoc(recipesCollectionRef, form)

    setForm({
      title: "",
      instructions: [],
      ingredients: []
    })

    setPopupAddRecipe(false)
  }

  const handleUpdate = e =>{
    e.preventDefault()

    if(
      !form.title ||
      !form.instructions ||
      !form.ingredients
    ){
      alert("Please fill out all fields")
      return
    }

    const filteredInstructions = form.instructions.filter(e => {return e});
    const filteredIngredients = form.ingredients.filter(e => {return e});

    updateDoc(doc(db, "recipes/aSiGCtv9zqkXf9uPs64K/Renz@email", RecipeID), {
      title: form.title,
      instructions: filteredInstructions,
      ingredients: filteredIngredients
    })

    setForm({
      title: "",
      instructions: [],
      ingredients: []
    })

    setPopupUpdateRecipe(false)
  }

  const handleIngredient = (e, i) =>{
    const ingredientsClone = [...form.ingredients]

    ingredientsClone[i] = e.target.value

    setForm({
      ...form,
      ingredients: ingredientsClone
    })
  }

  const handleinstruction = (e, i) =>{
    const instructionsClone = [...form.instructions]

    instructionsClone[i] = e.target.value

    setForm({
      ...form,
      instructions: instructionsClone
    })
  }

  const handleIngredientCount = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""]
    })
  }

  const handleinstructionCount = () => {
    setForm({
      ...form,
      instructions: [...form.instructions, ""]
    })
  }

  const removeRecipe = id =>{
    deleteDoc(doc(db, "recipes/aSiGCtv9zqkXf9uPs64K/Renz@email", id))
  }

  return (
    <div className="App">
      <h1>My recipes</h1>

      <button onClick={() => setPopupAddRecipe(!popupAddRecipe)}>Add recipe</button>

      <div className="recipes">
        {recipes.map((recipe, i) => (
          <div className="recipe" key={recipe.id}>
            <h3>{recipe.title}</h3>
            { recipe.viewing && 
              <div>
                <h4>Instructions</h4>
                <ol>
                  {recipe.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ol>
                <h4>Ingredients</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            }
            <div className="buttons">
              <button onClick={() => handleView(recipe.id)}>
                View {recipe.viewing ? 'less' : 'more'}
              </button>
              <button className="remove" onClick={() => removeRecipe(recipe.id)}>Remove</button>
              <button onClick={() => {setPopupUpdateRecipe(!popupUpdateRecipe)
                setForm({
                  title: recipe.title,
                  instructions: recipe.instructions,
                  ingredients: recipe.ingredients
                })
                setRecipeID(recipe.id)
              }}>
                Update
              </button>
            </div>
          </div> 
        ))}
      </div>

      { popupAddRecipe &&
        <div className="popup">
          <div className="popup-inner">
            <h2>Add a new recipe</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Ingredients</label>
                {
                  form.ingredients.map((ingredient, i) => (
                    <input
                      type="text"
                      key={i}
                      value={ingredient}
                      onChange={e => handleIngredient(e,i)}
                    />
                  ))
                }
                <button type="button" onClick={handleIngredientCount}>Add ingredient</button>
              </div>
              <div className="form-group">
                <label>instructions</label>
                {
                  form.instructions.map((instruction, i) => (
                    <textarea
                      type="text"
                      key={i}
                      value={instruction}
                      onChange={e => handleinstruction(e,i)}
                    />
                  ))
                }
                <button type="button" onClick={handleinstructionCount}>Add instruction</button>
              </div>

              <div className="buttons">
                <button type="submit">Submit</button>
                <button type="button" className="remove" onClick={() => setPopupAddRecipe(false)}>Close</button>
              </div>

            </form>
          </div>
        </div>
      }
      { popupUpdateRecipe &&
        <div className="popup">
          <div className="popup-inner">
            <h2>Update the recipe</h2>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>instructions</label>
                {
                  form.instructions.map((instruction, i) => (
                    <textarea
                      type="text"
                      key={i}
                      value={instruction}
                      onChange={e => handleinstruction(e,i)}
                    />
                  ))
                }
                <button type="button" onClick={handleinstructionCount}>Add instruction</button>
              </div>
              <div className="form-group">
                <label>Ingredients</label>
                {
                  form.ingredients.map((ingredient, i) => (
                    <input
                      type="text"
                      key={i}
                      value={ingredient}
                      onChange={e => handleIngredient(e,i)}
                    />
                  ))
                }
                <button type="button" onClick={handleIngredientCount}>Add ingredient</button>
              </div>
              

              <div className="buttons">
                <button type="submit">Update</button>
                <button type="button" className="remove" 
                  onClick={() => {setPopupUpdateRecipe(false)
                    setForm({
                      title: "",
                      instructions: [],
                      ingredients: []
                    })
                  }}>
                  Close
                </button>
              </div>

            </form>
          </div>
        </div>
      }

    </div>
  );
}

export default RecipeApp;
