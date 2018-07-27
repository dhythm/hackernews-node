const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root, args) =>  {
            const link = links.filter((item) => item.id == args.id)
            return link
        },
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (root, args) => {
            let index = 0
            links.forEach((e, i, a) => {
                if( e['id']==args.id ) index = i
            })
            const link = {
                id: args.id,
                description: args.description,
                url: args.url,
            }
            links[index] = link
            return link
        },
        deleteLink: (root, args) => {
            const new_links = links.filter((item) => item.id !== args.id)
            links = new_links
            return links
        },
    },
    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url,
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))