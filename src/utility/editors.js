import config from '../config'
import setContentFromData from './content'
import writeDataToSource from './dataIO'

// Loads all CKE editor instances specified in config
export const loadCKEditors = () => {
    for (let instance in config.editorInstances) {
        let thisInstance = config.editorInstances[instance]
        if (thisInstance.enabled) {
            if (!thisInstance.loaded) {
                thisInstance.promise = InlineEditor
                    .create(
                        document.querySelector("#" + thisInstance.selector)
                    )
                    .catch( error => {
                    console.error( error )
                } )
                thisInstance.loaded = true
            }
        }
    }
}
// Saves all CKE editor instances specified in config. Async Promise
// Saves to the dataSource
export const saveEditorContent = (component) => {
    return new Promise (function(resolve, reject) {
        if (component.state.isEditable) {
            let editors = {
                "selectors": [],
                "promises": []
            }
            for (let i in component.props.config.editorInstances) {
                let thisInstance = component.props.config.editorInstances[i]
                if (thisInstance.enabled && thisInstance.promise !== null) {
                    editors.selectors.push(thisInstance.selector)
                    editors.promises.push(
                        new Promise (function(resolve, reject) {
                            resolve(thisInstance.promise.then(function(editor) {
                                return editor.getData()
                            }))
                        })
                    )
                }
            }
            resolve(
                Promise.all(editors.promises).then(function(values) {
                    // let theData = readDataFromSource(component.props.dataSource, initialData, component.state.area, component.state.yrwk)
                    let theData = component.state.data
                    var newData
                    for (let i in values) {
                        newData = setContentFromData(values[i], theData, editors.selectors[i])
                    }
                    return newData
                })
                .then(function(result) {
                    writeDataToSource(component.props.dataSource, result, component.state.area, component.state.yrwk)
                    console.log("Saved to disk:", result)
                    return true
                })
            )
        } else {
            resolve(null)
        }
    })
}
// Unloads all CKE editor instances specified in config. Async Promise
export const destroyEditors = (component) => {
    return new Promise (function(resolve, reject) {
        if (component.state.isEditable) {
            var promises = []
            var complete = []
            for (let i in component.props.config.editorInstances) {
                let thisInstance = component.props.config.editorInstances[i]
                if (thisInstance.enabled && thisInstance.promise !== null) {
                    promises.push(thisInstance.promise)
                    thisInstance.loaded = false
                    complete.push(false)
                }
            }
            resolve(
                Promise.all(promises).then(function(editor) {
                    for (let i in editor) {
                        editor[i].destroy()
                    }
                    return true
                }).then(function(results) {
                    console.log("CKE editors have been unloaded.", results)
                    return results
                })
            )
        } else {
            resolve(null)
        }
    })
}
