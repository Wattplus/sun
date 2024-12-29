create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    first_name text,
    last_name text,
    phone text,
    postal_code text,
    client_type text,
    monthly_bill text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
    on profiles for select
    using ( true );

create policy "Users can insert their own profile."
    on profiles for insert
    with check ( auth.uid() = id );

create policy "Users can update own profile."
    on profiles for update
    using ( auth.uid() = id );