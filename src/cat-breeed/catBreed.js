import React, { Component } from 'react'
import axios from 'axios'
import './cat-breed.css'
import img from '../img/bac.png'
axios.defaults.baseURL = 'https://api.thecatapi.com/v1'
axios.defaults.headers.common['x-api-key'] = 'd0415671-43da-4c75-8403-fb53b98fa11b'
class cat extends Component {


    async getBreeds() {
        const res = await axios('/breeds')
        return res.data
    }
    async getCatsImagesByBreed(breed_id, amount) {
        const res = await axios('/images/search?breed_ids=' + breed_id + "&limit=" + amount)

        console.table(res.data)
        return res.data
    }

    async loadBreedImages() {
        console.log('Load Breed Images:', this.state.selected_breed)

        let breed_images = await this.getCatsImagesByBreed(this.state.selected_breed, 9)

        this.setState({ images: breed_images })
    }

    constructor(...args) {

        super(...args)
        this.state = {
            images: [],
            breeds: [],
            selected_breed: 0
        }

        this.onBreedSelectChange = this.onBreedSelectChange.bind(this)
    }
    async onBreedSelectChange(e) {
        console.log("Breed Selected. ID:", e.target.value)
        await this.setState({ selected_breed: e.target.value })
        await this.loadBreedImages()
    }
    componentDidMount() {
        if (this.state.breeds.length === 0) {
            (async () => {
                try {
                    this.setState({ breeds: await this.getBreeds() })
                } catch (e) {
                    //...handle the error...
                    console.error(e)
                }
            })()
        }
    }
    render() {
        const myStyle = {
            backgroundImage:
                `url(${img})`,
            height: '949px',
            marginTop: '-20px',
            position: 'relative',
            fontSize: '50px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }
        return (
            <div style={myStyle}>
                <div>
                    <select className="button"
                        value={this.state.selected_breed}
                        onChange={this.onBreedSelectChange}>
                        <h1>helloo</h1>
                        {this.state.breeds.map((breed) => <option key={breed.id} value={breed.id}>{breed.name}</option>)}
                    </select>
                    <div className='grid'>
                        {this.state.images.map((image) => <img className="cat-image" alt="" src={image.url}></img>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default cat
