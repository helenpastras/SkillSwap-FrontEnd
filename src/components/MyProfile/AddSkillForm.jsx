import { useState, useEffect } from 'react'

import { useParams, Link } from 'react-router';

import * as skillService from "../../services/skillService"

const AddSkillForm = ({ handleAddSkill, handleUpdateSkill }) => {

    const { type } = useParams()
    // console.log({type})
    const { skillId } = useParams()
   // console.log(skillId)

    const initialState = {
        skillName: '',
        category: '',
        skillLevel: '',
        timeFrame: '',
        description: '',
        type:`${type}`,
    }
    //console.log(initialState)

    const [formData, setFormData] = useState(initialState)
    
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        // console.log("FormData:", formData) // testing form data populates
        if (skillId) {
            handleUpdateSkill(skillId, formData)
        } else {
        handleAddSkill(formData)
        }
    }

    useEffect(() => {
        const fetchSkill = async () => {
            const skillData = await skillService.showSkill(skillId)
            setFormData(skillData)
        }
        if (skillId) fetchSkill()
    }, [skillId])

    return (
    <>
    { type === "offered" ? (
        <>
        <h1> Skill Offered Form: </h1> 
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="skillName"> Skill Name </label>
                    <input
                        id="skillName"
                        name="skillName"
                        value={formData.skillName}
                        onChange={handleChange} 
                        required
                    />
                <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                    <option value="">-- Select a category --</option>
                    {[
                        'Technology', 'Arts & Crafts', 'Music', 'Languages', 'Sports & Fitness',
                        'Cooking', 'Business', 'Writing', 'Photography', 'Gardening',
                        'Repair & Maintenance', 'Teaching', 'Health & Wellness', 'Other'
                    ].map((cat) => (
                        <option key={cat} value={cat}>
                        {cat}
                        </option>
                    ))}
                    </select>
                <label htmlFor="skillLevel">Level of Expertise</label>
                    <select
                        id="skillLevel"
                        name="skillLevel"
                        value={formData.skillLevel}
                        onChange={handleChange}
                        required
                    >
                    <option value="">-- Select a level of competency/expertise --</option>
                    {[
                        'Beginner', 'Intermediate', 'Advanced', 'Expert'
                    ].map((cat) => (
                        <option key={cat} value={cat}>
                        {cat}
                        </option>
                    ))}
                    </select>
                <label htmlFor="timeFrame">Time required to teach skill</label>
                    <select
                        id="timeFrame"
                        name="timeFrame"
                        value={formData.timeFrame}
                        onChange={handleChange}
                        required
                    >
                    <option value="">-- Select a base timeframe for teaching the skill --</option>
                    {[
                        '1-2 hours', '3-5 hours', '1 day', '2-3 days', '1 week', '2+ weeks', 'Ongoing'
                    ].map((cat) => (
                        <option key={cat} value={cat}>
                        {cat}
                        </option>
                    ))}
                    </select>
                <label htmlFor="description"> Description </label>
                    <input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange} 
                        rows={4}
                        placeholder='Add a brief description of your skill and experience...'
                    />
                <button type="submit">Submit Offered Skill</button>
                <Link to={"/profile"} className="button">Back</Link>
            </form>
        </div>
        </>
       ) : (
        <>
        <h1> Skill Wanted Form: </h1> 
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="skillName"> Skill Name </label>
                    <input
                        id="skillName"
                        name="skillName"
                        value={formData.skillName}
                        onChange={handleChange} 
                        required
                    />
                <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                    <option value="">-- Select a category --</option>
                    {[
                        'Technology', 'Arts & Crafts', 'Music', 'Languages', 'Sports & Fitness',
                        'Cooking', 'Business', 'Writing', 'Photography', 'Gardening',
                        'Repair & Maintenance', 'Teaching', 'Health & Wellness', 'Other'
                    ].map((cat) => (
                        <option key={cat} value={cat}>
                        {cat}
                        </option>
                    ))}
                    </select>
                <label htmlFor="skillLevel">Level of Expertise</label>
                    <select
                        id="skillLevel"
                        name="skillLevel"
                        value={formData.skillLevel}
                        onChange={handleChange}
                        required
                    >
                    <option value="">-- Select a level of competency/expertise --</option>
                    {[
                        'Beginner', 'Intermediate', 'Advanced', 'Expert'
                    ].map((cat) => (
                        <option key={cat} value={cat}>
                        {cat}
                        </option>
                    ))}
                    </select>
                <button type="submit">Submit Wanted Skill</button>
                <Link to={"/profile"} className="button">Back</Link>

            </form>
        </div>
        </>
       )}
    </>
)};     

export default AddSkillForm;