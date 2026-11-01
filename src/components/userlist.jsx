
import { useState, useEffect } from "react";
import "./user.css";

function Userlist() {
    const [user, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        const controller = new AbortController();

        async function fetchUsers() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users",
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch users. Please try again.");
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchUsers();

        return () => controller.abort();
    },[]);

    const filteredUsers = user.filter((person) => {
        const query = search.toLowerCase();

        return (
            person.name.toLowerCase().includes(query) ||
            person.email.toLowerCase().includes(query) ||
            person.address.city.toLowerCase().includes(query) ||
            person.company.name.toLowerCase().includes(query)
        );
    });

    const UserIcon = () => (
        <svg viewBox="0 0 24 24" width="23" height="23"
            fill="none" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
            <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );

    const MailIcon = () => (
        <svg viewBox="0 0 24 24" width="17" height="17"
            fill="none" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </svg>
    );

    const LocationIcon = () => (
        <svg viewBox="0 0 24 24" width="17" height="17"
            fill="none" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    );

    const PhoneIcon = () => (
        <svg viewBox="0 0 24 24" width="17" height="17"
            fill="none" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.2 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.28 3.18 2 2 0 0 1 4.27 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.25 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.57 2.04Z" />
        </svg>
    );

    const BuildingIcon = () => (
        <svg viewBox="0 0 24 24" width="17" height="17"
            fill="none" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" />
        </svg>
    );

    if (loading) {
        return (
            <div className="users-message">
                <div className="users-spinner"></div>
                <h2>Loading users...</h2>
                <p>Please wait while we fetch the user data.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="users-message">
                <div className="users-message-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32"
                        fill="none" stroke="currentColor" strokeWidth="1.7"
                        strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4m0 4h.01" />
                    </svg>
                </div>
                <h2>Unable to load users</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="users-page">

        
            <div className="users-header">
                <div className="users-title">
                    <span className="users-eyebrow">DIRECTORY</span>
                    <h1>Users <span>Directory</span></h1>
                    <p>Explore and manage your user information.</p>
                </div>

                <div className="users-count">
                    <div className="users-count-icon">
                        <UserIcon />
                    </div>
                    <div>
                        <p>Total users</p>
                        <h2>{user.length}</h2>
                        <span>Fetched from API</span>
                    </div>
                </div>
            </div>

         
            <div className="users-toolbar">
                <div className="users-search">
                    <svg viewBox="0 0 24 24" width="21" height="21"
                        fill="none" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-4-4" />
                    </svg>

                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, city or company..."
                        aria-label="Search users"
                    />

                    {search && (
                        <button
                            className="clear-search"
                            onClick={() => setSearch("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <p className="users-results">
                    Showing <strong>{filteredUsers.length}</strong> of {user.length}
                </p>
            </div>

            {filteredUsers.length > 0 ? (
                <div className="users-grid">
                    {filteredUsers.map((person) => (
                        <article className="user-card" key={person.id}>
                            <div className="user-card-top">
                                <div className="user-avatar">
                                    {person.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="user-id">
                                    ID #{person.id}
                                </span>
                            </div>

                            <div className="user-info">
                                <h3>{person.name}</h3>
                                <p className="user-username">
                                    @{person.username}
                                </p>

                                <div className="user-detail">
                                    <MailIcon />
                                    <span>{person.email}</span>
                                </div>

                                <div className="user-detail">
                                    <LocationIcon />
                                    <span>{person.address.city}</span>
                                </div>

                                <div className="user-detail">
                                    <BuildingIcon />
                                    <span>{person.company.name}</span>
                                </div>

                                <button
                                    className="details-btn"
                                    onClick={() => setSelectedUser(person)}
                                >
                                    View details
                                    <svg viewBox="0 0 24 24" width="17" height="17"
                                        fill="none" stroke="currentColor"
                                        strokeWidth="1.8" strokeLinecap="round"
                                        strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="users-empty">
                    <div className="users-message-icon">
                        <svg viewBox="0 0 24 24" width="32" height="32"
                            fill="none" stroke="currentColor" strokeWidth="1.7"
                            strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-4-4" />
                        </svg>
                    </div>
                    <h2>No users found</h2>
                    <p>Try another name, email, city or company.</p>
                </div>
            )}

          
            {selectedUser && (
                <div
                    className="user-modal-overlay"
                    onClick={() => setSelectedUser(null)}
                >
                    <section
                        className="user-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="user-modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setSelectedUser(null)}
                            aria-label="Close details"
                        >
                            ×
                        </button>

                        <div className="modal-avatar">
                            {selectedUser.name.charAt(0).toUpperCase()}
                        </div>

                        <span className="users-eyebrow">USER PROFILE</span>
                        <h2 id="user-modal-title">{selectedUser.name}</h2>
                        <p className="modal-username">
                            @{selectedUser.username}
                        </p>

                        <div className="modal-details">
                            <div>
                                <MailIcon />
                                <span>
                                    <small>Email</small>
                                    {selectedUser.email}
                                </span>
                            </div>
                            <div>
                                <PhoneIcon />
                                <span>
                                    <small>Phone</small>
                                    {selectedUser.phone}
                                </span>
                            </div>
                            <div>
                                <LocationIcon />
                                <span>
                                    <small>Address</small>
                                    {selectedUser.address.street}, {selectedUser.address.suite},
                                    {` ${selectedUser.address.city} ${selectedUser.address.zipcode}`}
                                </span>
                            </div>
                            <div>
                                <BuildingIcon />
                                <span>
                                    <small>Company</small>
                                    {selectedUser.company.name}
                                    <br />
                                    <small>{selectedUser.company.catchPhrase}</small>
                                </span>
                            </div>
                            <div>
                                <svg viewBox="0 0 24 24" width="17" height="17"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="1.7" strokeLinecap="round"
                                    strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
                                </svg>
                                <span>
                                    <small>Website</small>
                                    {selectedUser.website}
                                </span>
                            </div>
                        </div>

                        <button
                            className="modal-done-btn"
                            onClick={() => setSelectedUser(null)}
                        >
                            Close details
                        </button>
                    </section>
                </div>
            )}
        </div>
    );
}

export default Userlist;
