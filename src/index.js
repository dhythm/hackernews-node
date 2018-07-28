const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed,
    /* remove in Chapter.7
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
            feed: (root, args, context, info) => {
            return context.db.query.links({},info)
        },
        // remove in Chapter.5
        feed: () => links,
        link: (root, args) =>  {
            const link = links.filter((item) => item.id == args.id)
            return link
        },
        // end
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description,
                },
            }, info)
        },
    },
    // remove in Chapter.5
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
    },
    */
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://xxx.xxxxxx.xx/xxxxxxxxxxx-xxxxxx/xxxxxxxx/xxx',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))