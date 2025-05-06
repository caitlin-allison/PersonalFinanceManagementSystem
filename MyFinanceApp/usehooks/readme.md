# UseHooks
## Create / Delete / Get / Update
These all handle CRUD operations through React Query and SQLite DB. There is no implementation for Update or Delete as of right now.

## Notes
This is a note that to call the db, the usehook MUST be used under App.json (ie. from a screens/components) otherwise this will break the rule of hooks. Shouldn't happened but its good to document edge cases


Do NOT use ' new QueryClient()' this is initialized in App.tsx. Every other usage should call 'useQueryClient()' instead so that we have a consistent and stable component

~ Created and edited by Caitlin Allison (5/5/2025)