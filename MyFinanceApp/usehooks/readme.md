This is a note that to call the db, the usehook MUST be used under App.json (ie. from a screens/components) otherwise this will break the rule of hooks. Shouldn't happened but its good to document edge cases


Do NOT use ' new QueryClient()' this is initialized in App.tsx. Every other usage should call 'useQueryClient()' instead so that we have a consistent and stable component