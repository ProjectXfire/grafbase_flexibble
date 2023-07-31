import { g, config, auth } from '@grafbase/sdk';

// @ts-ignore
const User = g
  .model('User', {
    name: g.string().length({ min: 1, max: 20 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().optional(),
    githubUrl: g.url().optional(),
    linkedInUrl: g.url().optional(),
    projects: g
      .relation(() => Project)
      .list()
      .optional()
  })
  .auth((rules) => {
    rules.public().read();
  });

// @ts-ignore
const Project = g
  .model('Project', {
    title: g.string().length({ min: 1, max: 50 }),
    description: g.string().length({ min: 1, max: 150 }),
    imageUrl: g.url(),
    imageCode: g.string(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string().search(),
    createdBy: g.relation(() => User)
  })
  .auth((rules) => {
    rules.public().read();
    rules.private().create().delete().update();
  });

const jwt = auth.JWT({ issuer: 'grafbase', secret: g.env('NEXTAUTH_SECRET') });

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  }
});
