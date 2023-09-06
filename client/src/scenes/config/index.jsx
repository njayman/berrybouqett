import { Grid, Container, Button, LinearProgress, Box, TextField } from "@mui/material"
import { useGetNoteConfigQuery } from "@state/api"
import { useEffect, useState } from "react"
import { useEditNoteConfigMutation } from "@state/api"

const NoteConfig = () => {
    const [edit, setEdit] = useState(false)
    const { isLoading: configLoading, data } = useGetNoteConfigQuery()
    const [configs, setConfigs] = useState({})
    const [editNoteConfig, { isLoading: configEditLoading }] = useEditNoteConfigMutation()
    const handleChange = (e) => {
        setConfigs(c => ({
            ...c,
            [e.target.id]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            editNoteConfig({ body: configs })
        } catch (error) {
            console.log(error)
        } finally {
            setEdit(false)
        }
    }

    useEffect(() => {
        setConfigs(data)
    }, [data])

    return <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
            <Container>
                <Button variant="primary" onClick={() => setEdit(ed => !ed)}>{edit ? "Cancel" : "Edit"}</Button>
            </Container>
        </Grid>
        <Grid item xs={12}>
            <Container>
                {(configLoading || configEditLoading) ? <LinearProgress /> : <Box component="form" onSubmit={handleSubmit}>
                    <TextField id="fontSize" name="fontSize" label="Font Size" value={configs?.fontSize} disabled={!edit} onChange={handleChange} />
                    <br />
                    <Button type="submit" disabled={!edit}>Save</Button>
                </Box>}
            </Container>
        </Grid>
    </Grid>
}

export default NoteConfig