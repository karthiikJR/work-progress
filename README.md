# Work Progress

**Work Progress** is a web application designed to help you efficiently track and manage your project tasks using a Kanban board. With features for project and task management, it provides a clear and organized view of your workflow. 

## Features

- **Kanban Board**: Visualize and manage tasks with columns for "todo," "backlog," "in progress," and "done."
- **Dashboard**: 
  - View total number of projects.
  - Track completed and remaining projects.
  - Monitor total tasks, including done, pending, and backlog.
- **User Authentication**:
  - Sign up and log in using email and password.
  - Google login integration.
  - Password reset functionality.

## Screenshots

*Landing page*
![Home Page](https://github.com/user-attachments/assets/338ea0b9-1548-4e89-9dca-b76f962a3fc5)


*Dashboard overview showing project and task statistics.*
![Dashboard](https://github.com/user-attachments/assets/bb670f51-9dd5-4ebd-ad75-6ae741ea86b7)


*Kanban board with tasks organized in columns.*
![Kanban Board](https://github.com/user-attachments/assets/b92fd23e-5f17-4fff-8efc-efea9ecf40fc)![Kanban Light](https://github.com/user-attachments/assets/54fa427c-74a1-4521-9b77-0c0c56092a03)

*Add new Project to track the progress*
![Add Project](https://github.com/user-attachments/assets/4f5aa9db-63a0-43ec-ab8b-d8e1d12ac58b)


*Login page with options for email/password and Google login.*
![Login](https://github.com/user-attachments/assets/57b83296-64fe-41d8-a21c-027e205e8547)
![Signup](https://github.com/user-attachments/assets/d50fcb35-e362-4472-8296-533a407ab4f3)
![Reset Password](https://github.com/user-attachments/assets/ad21ccc9-000c-463a-96e0-a23af2ce9cb9)


## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/karthiikJR/work-progress.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd work-progress
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up Supabase:**
   - Create a Supabase account and project at [Supabase](https://supabase.com/).
   - Set up the database schema using the following SQL commands:
     ```sql
          create table public.project (
       "userId" uuid not null,
       "projectId" uuid not null default gen_random_uuid(),
       "projectName" text not null,
       "projectDetails" text null,
       constraint project_pkey primary key ("projectId"),
       constraint project_userId_fkey foreign key ("userId") references auth.users (id) on update cascade on delete cascade
     ) tablespace pg_default;
     
     create table public.card (
       "cardId" uuid not null default gen_random_uuid(),
       "projectId" uuid null,
       "cardContent" text null,
       "column" character varying not null default 'todo'::character varying,
       constraint card_pkey primary key ("cardId"),
       constraint card_projectId_fkey foreign key ("projectId") references public.project ("projectId") on update cascade on delete cascade
     ) tablespace pg_default;
     ```
   - Function for the Dashboard
       The dashboard aggregates project and task data from the Supabase database and provides insights such as:
        - Total number of projects.
        - Number of completed and remaining projects.
        - Count of tasks categorized by status (done, pending, backlog).

5. **Configure environment variables:**
   - Create a `.env.local` file in the root of your project directory and add the following variables:
     ```plaintext
     NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
     NEXT_PUBLIC_SUPABASE_SERVICE_KEY=<your-supabase-service-key>
     NEXT_PUBLIC_ENV=<your-environment>
     NEXT_ENV=<your-environment>
     NEXT_PUBLIC_REDIRECT_URL=<your-redirect-url>
     ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **TypeScript**: Superset of JavaScript providing static types.
- **ShadCN-UI**: Component library for building user interfaces.
- **Recharts**: Charting library for visualizing data.
- **Supabase**: Backend-as-a-Service for database, authentication, and real-time functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
